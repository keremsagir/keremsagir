/**
 * Client-side CV Parser Service
 * Extracts structured data from PDF and DOCX files using regex-based section analysis
 */

/**
 * Parse a CV file (PDF or DOCX) and extract structured data
 * @param {File} file - The uploaded file
 * @returns {Promise<Object>} - Parsed CV data
 */
export async function parseCvFile(file) {
  const extension = file.name.split('.').pop().toLowerCase();
  let rawText = '';

  if (extension === 'pdf') {
    rawText = await extractTextFromPdf(file);
  } else if (extension === 'docx') {
    rawText = await extractTextFromDocx(file);
  } else {
    throw new Error('Desteklenmeyen dosya formatı. Lütfen PDF veya DOCX yükleyin.');
  }

  return parseRawText(rawText);
}

/**
 * Extract text from PDF using pdfjs-dist
 */
async function extractTextFromPdf(file) {
  const pdfjsLib = await import('pdfjs-dist');

  // Set up the worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

/**
 * Extract text from DOCX using mammoth
 */
async function extractTextFromDocx(file) {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/**
 * Parse raw text into structured CV data
 */
function parseRawText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const cvData = {
    fullName: extractName(lines, text),
    title: extractTitle(lines, text),
    email: extractEmail(text),
    phone: extractPhone(text),
    linkedin: extractLinkedIn(text),
    github: extractGitHub(text),
    website: extractWebsite(text),
    summary: extractSection(text, ['summary', 'objective', 'profile', 'about', 'özet', 'profil', 'hakkımda', 'hakkinda']),
    experiences: extractExperiences(text),
    educations: extractEducations(text),
    skills: extractSkills(text),
    languages: extractLanguages(text),
    certifications: extractCertifications(text),
    projects: extractProjects(text),
  };

  return cvData;
}

// --- Extractors ---

function extractName(lines, text) {
  // Usually the first non-empty, non-contact line is the name
  for (const line of lines) {
    const cleaned = line.trim();
    if (cleaned.length < 2 || cleaned.length > 60) continue;
    if (cleaned.includes('@') || cleaned.match(/[\+]?\d[\d\s\-\(\)]{7,}/)) continue;
    if (cleaned.match(/^(http|www\.|linkedin|github)/i)) continue;
    // Check if it looks like a name (2-4 words, mostly letters)
    if (cleaned.match(/^[A-ZÇĞİÖŞÜa-zçğıöşü\s\.\-']{2,50}$/) && cleaned.split(/\s+/).length <= 5) {
      return cleaned;
    }
  }
  return lines[0] || 'Ad Soyad';
}

function extractTitle(lines, text) {
  const titlePatterns = [
    /(?:title|position|role|unvan|pozisyon)\s*[:\-|]\s*(.+)/i,
  ];

  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }

  // Check 2nd and 3rd lines for a job title
  const titleKeywords = [
    'developer', 'engineer', 'designer', 'manager', 'analyst', 'consultant',
    'architect', 'specialist', 'geliştirici', 'mühendis', 'tasarımcı', 'uzman',
    'yazılım', 'software', 'full stack', 'frontend', 'backend', 'devops', 'data',
    'product', 'project', 'senior', 'junior', 'lead', 'intern', 'stajyer'
  ];

  for (let i = 1; i < Math.min(5, lines.length); i++) {
    const lower = lines[i].toLowerCase();
    if (titleKeywords.some(kw => lower.includes(kw))) {
      return lines[i].trim();
    }
  }

  return '';
}

function extractEmail(text) {
  const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : '';
}

function extractPhone(text) {
  const match = text.match(/[\+]?\(?\d{1,4}\)?[\s\-\.]?\(?\d{1,4}\)?[\s\-\.]?\d{2,4}[\s\-\.]?\d{2,4}[\s\-\.]?\d{0,4}/);
  return match ? match[0].trim() : '';
}

function extractLinkedIn(text) {
  const match = text.match(/(?:linkedin\.com\/in\/[a-zA-Z0-9\-_]+|linkedin\s*[:\-]?\s*([\w\-]+))/i);
  if (match) {
    if (match[0].includes('linkedin.com')) return 'https://' + match[0].replace(/^https?:\/\//, '');
    return `https://linkedin.com/in/${match[1]}`;
  }
  return '';
}

function extractGitHub(text) {
  const match = text.match(/(?:github\.com\/[a-zA-Z0-9\-_]+|github\s*[:\-]?\s*([\w\-]+))/i);
  if (match) {
    if (match[0].includes('github.com')) return 'https://' + match[0].replace(/^https?:\/\//, '');
    return `https://github.com/${match[1]}`;
  }
  return '';
}

function extractWebsite(text) {
  const match = text.match(/(?:website|web|site|portfolio)\s*[:\-]?\s*(https?:\/\/[^\s]+)/i);
  if (match) return match[1];

  // Generic URL that's not linkedin or github
  const urlMatch = text.match(/https?:\/\/(?!(?:www\.)?(?:linkedin|github))[^\s]+/i);
  return urlMatch ? urlMatch[0] : '';
}

function extractSection(text, headers) {
  const headerPattern = headers.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(
    `(?:^|\\n)\\s*(?:${headerPattern})\\s*[:\\-|]*\\s*\\n([\\s\\S]*?)(?=\\n\\s*(?:${getAllSectionHeaders()})\\s*[:\\-|]*\\s*(?:\\n|$)|$)`,
    'im'
  );
  const match = text.match(regex);
  if (match) {
    return match[1].trim().split('\n').map(l => l.trim()).filter(l => l).join(' ');
  }
  return '';
}

function getAllSectionHeaders() {
  const allHeaders = [
    'summary', 'objective', 'profile', 'about', 'özet', 'profil', 'hakkımda', 'hakkinda',
    'experience', 'work experience', 'employment', 'deneyim', 'iş deneyimi', 'tecrübe',
    'education', 'eğitim', 'akademik',
    'skills', 'technical skills', 'competencies', 'yetenekler', 'beceriler',
    'languages', 'diller',
    'certifications', 'certificates', 'sertifikalar',
    'projects', 'projeler',
    'references', 'referanslar',
    'hobbies', 'interests', 'hobiler'
  ];
  return allHeaders.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
}

function extractExperiences(text) {
  const sectionText = extractSectionRaw(text, [
    'experience', 'work experience', 'employment', 'professional experience',
    'deneyim', 'iş deneyimi', 'tecrübe', 'profesyonel deneyim'
  ]);

  if (!sectionText) return [];

  const experiences = [];
  const lines = sectionText.split('\n').map(l => l.trim()).filter(l => l);

  let current = null;

  for (const line of lines) {
    // Date pattern detection
    const dateMatch = line.match(
      /(\d{4}\s*[-–—]\s*(?:\d{4}|present|current|halen|devam|günümüz))|(\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|oca|şub|mar|nis|may|haz|tem|ağu|eyl|eki|kas|ara)\w*\s+\d{4}\s*[-–—]\s*(?:\w+\s+\d{4}|present|current|halen|devam))/i
    );

    const isNewEntry = dateMatch || (
      line.length < 100 &&
      !line.startsWith('•') && !line.startsWith('-') && !line.startsWith('–') &&
      line === line && /[A-ZÇĞİÖŞÜ]/.test(line[0]) &&
      (line.includes('|') || line.includes(' at ') || line.includes(' - ') || line.includes(' – '))
    );

    if (isNewEntry && (dateMatch || current)) {
      if (current) experiences.push(current);
      current = {
        company: '',
        position: '',
        period: dateMatch ? dateMatch[0] : '',
        description: ''
      };

      // Try to parse company and position
      let titleLine = dateMatch ? line.replace(dateMatch[0], '').trim() : line;
      titleLine = titleLine.replace(/^[\s|,\-–—]+|[\s|,\-–—]+$/g, '');

      const parts = titleLine.split(/\s*[|–—]\s*|\s+at\s+|\s*,\s*/);
      if (parts.length >= 2) {
        current.position = parts[0].trim();
        current.company = parts[1].trim();
      } else if (parts[0]) {
        current.company = parts[0].trim();
      }
    } else if (current) {
      // It's a description line
      const cleanLine = line.replace(/^[•\-–—\*]\s*/, '').trim();
      if (cleanLine) {
        current.description += (current.description ? '\n' : '') + cleanLine;
      }
    }
  }

  if (current) experiences.push(current);
  return experiences;
}

function extractEducations(text) {
  const sectionText = extractSectionRaw(text, [
    'education', 'eğitim', 'akademik', 'academic'
  ]);

  if (!sectionText) return [];

  const educations = [];
  const lines = sectionText.split('\n').map(l => l.trim()).filter(l => l);
  let current = null;

  for (const line of lines) {
    const dateMatch = line.match(/\d{4}\s*[-–—]\s*(?:\d{4}|present|current|halen|devam|günümüz)/i);
    const isSchoolLine = line.match(
      /(?:university|üniversite|college|school|okul|institute|enstitü|faculty|fakülte|lisans|bachelor|master|phd|mba|associate|lise|high school)/i
    );

    if (isSchoolLine || dateMatch) {
      if (current) educations.push(current);
      current = {
        school: '',
        degree: '',
        period: dateMatch ? dateMatch[0] : '',
        description: ''
      };

      let titleLine = dateMatch ? line.replace(dateMatch[0], '').trim() : line;
      titleLine = titleLine.replace(/^[\s|,\-–—]+|[\s|,\-–—]+$/g, '');

      const parts = titleLine.split(/\s*[|–—]\s*|\s*,\s*/);
      if (parts.length >= 2) {
        current.school = parts[0].trim();
        current.degree = parts[1].trim();
      } else {
        current.school = parts[0]?.trim() || '';
      }
    } else if (current) {
      const cleanLine = line.replace(/^[•\-–—\*]\s*/, '').trim();
      if (cleanLine) {
        if (!current.degree && cleanLine.match(/(?:lisans|bachelor|master|phd|mba|mühendislik|bilgisayar|engineering|computer|science)/i)) {
          current.degree = cleanLine;
        } else {
          current.description += (current.description ? '\n' : '') + cleanLine;
        }
      }
    }
  }

  if (current) educations.push(current);
  return educations;
}

function extractSkills(text) {
  const sectionText = extractSectionRaw(text, [
    'skills', 'technical skills', 'competencies', 'technologies',
    'yetenekler', 'beceriler', 'teknik beceriler', 'teknolojiler'
  ]);

  if (!sectionText) return [];

  // Split by common delimiters
  const skills = sectionText
    .split(/[,;•\-–—\n|\/\\]+/)
    .map(s => s.replace(/^[\s:]+|[\s:]+$/g, '').trim())
    .filter(s => s.length > 0 && s.length < 50)
    .filter(s => !s.match(/^(skills|technical|yetenekler|beceriler)$/i));

  return [...new Set(skills)];
}

function extractLanguages(text) {
  const sectionText = extractSectionRaw(text, [
    'languages', 'diller', 'yabancı dil'
  ]);

  if (!sectionText) return [];

  return sectionText
    .split(/[,;•\-–—\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && s.length < 50);
}

function extractCertifications(text) {
  const sectionText = extractSectionRaw(text, [
    'certifications', 'certificates', 'sertifikalar', 'licenses'
  ]);

  if (!sectionText) return [];

  return sectionText
    .split(/\n/)
    .map(s => s.replace(/^[•\-–—\*]\s*/, '').trim())
    .filter(s => s.length > 0);
}

function extractProjects(text) {
  const sectionText = extractSectionRaw(text, [
    'projects', 'projeler', 'personal projects', 'kişisel projeler'
  ]);

  if (!sectionText) return [];

  const projects = [];
  const lines = sectionText.split('\n').map(l => l.trim()).filter(l => l);
  let current = null;

  for (const line of lines) {
    const isBullet = /^[•\-–—\*]/.test(line);

    if (!isBullet && line.length < 80 && /^[A-ZÇĞİÖŞÜ]/.test(line)) {
      if (current) projects.push(current);
      current = { name: line.trim(), description: '', technologies: '' };
    } else if (current) {
      const cleanLine = line.replace(/^[•\-–—\*]\s*/, '').trim();
      if (cleanLine.match(/(?:tech|teknoloji|stack|built with|kullanılan)/i)) {
        current.technologies = cleanLine.replace(/(?:tech|teknoloji|stack|built with|kullanılan)\s*[:\-]?\s*/i, '');
      } else {
        current.description += (current.description ? ' ' : '') + cleanLine;
      }
    }
  }

  if (current) projects.push(current);
  return projects;
}

function extractSectionRaw(text, headers) {
  const headerPattern = headers.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(
    `(?:^|\\n)\\s*(?:${headerPattern})\\s*[:\\-|]*\\s*\\n([\\s\\S]*?)(?=\\n\\s*(?:${getAllSectionHeaders()})\\s*[:\\-|]*\\s*(?:\\n|$)|$)`,
    'im'
  );
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}
