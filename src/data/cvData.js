export const cvData = {
  personal: {
    name: "Kerem Sağır",
    title: "Endüstri Mühendisi & Yazılım Geliştirici",
    location: "İstanbul, Türkiye 34203",
    email: "kereembey@gmail.com",
    phone: "+90 538 465 66 42",
    linkedin: "https://linkedin.com/in/keremsagir/",
    github: "https://github.com/keremsagir",
    about: "Bilgisayar Programcılığı kökenli kodlama ve algoritma temelim ile Endüstri Mühendisliği'nin analitik bakış açısını harmanlıyorum. Teknik yetkinliklerimi ve yazılım geliştirme tutkumuyla katma değeri yüksek projelerde rol alarak; modern teknolojilerle yenilikçi çözümler üreten, uzun vadeli ve başarılı bir kariyer inşa etmeyi hedefliyorum.",
    statusText: "Aktif olarak iş arıyor",
    highlights: [
      "Endüstri Mühendisliği + Yazılım çift yetkinlik",
      "Mercedes-Benz Otomotiv staj deneyimi",
      "Bitirme projesi ile süreç optimizasyonu"
    ]
  },
  education: [
    {
      id: 1,
      institution: "Yalova Üniversitesi",
      department: "Endüstri Mühendisliği",
      period: "2020 – Haziran 2026",
      degree: "2.49",
      description: ""
    },
    {
      id: 2,
      institution: "İstanbul Üniversitesi",
      department: "Bilgisayar Programcılığı",
      period: "2015 - 2017",
      degree: "3.04",
      description: ""
    },
    {
      id: 3,
      institution: "İstanbul Ticaret Odası Mesleki ve Teknik Anadolu Lisesi",
      department: "BİLİŞİM TEKNOLOJİLERİ ALANI / Web Programcılığı",
      period: "2011 - 2015",
      degree: "",
      description: ""
    }
  ],
  experience: [
    {
      id: 1,
      company: "Mercedes-Benz Otomotiv",
      role: "Intern Software Engineer",
      period: "Ekim 2025 – Devam Ediyor",
      isActive: true,
      responsibilities: [
        "Kurumsal ölçekli yazılım projelerinde, SDLC (Yazılım Geliştirme Yaşam Döngüsü) süreçlerinin canlı ortamdaki akışını ve ekipler arası koordinasyonu yerinde gözlemledim.",
        "Agile ve SAFe metodolojilerinin büyük ekiplerde nasıl uygulandığını, Sprint planlama ve Daily Scrum rutinlerine katılarak deneyimledim.",
        "Yazılım geliştirme süreçlerinde karşılaşılan teknik problemlerin çözüm yaklaşımlarını inceleyerek, kurumsal kod standartları ve mimari yapılar hakkında farkındalık kazandım."
      ]
    },
    {
      id: 2,
      company: "Teknosa Genel Müdürlük",
      role: "IT",
      period: "Haziran 2013 – Temmuz 2013",
      isActive: false,
      responsibilities: [
        "Ağ altyapısı ve masaüstü sistemlerin donanım/yazılım bakım süreçlerini yöneterek teknik sorunlara hızlı çözümler ürettim.",
        "Kullanıcı destek operasyonlarını yürüterek, donanım arızalarının tespiti ve giderilmesi süreçlerinde aktif görev aldım."
      ]
    }
  ],
  skills: [
    {
      category: "Yazılım & Web",
      items: ["Python", "JavaScript", "HTML", "CSS"]
    },
    {
      category: "Endüstriyel Yetkinlikler",
      items: ["Üretim Planlama", "İş Etüdü", "Kalite Yönetimi", "Süreç Analizi"]
    },
    {
      category: "Araçlar",
      items: ["MS Office", "SQL", "Git"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "İnsan Kaynakları Süreç Optimizasyonu ve Web Tabanlı Aday Takip Sistemi",
      subtitle: "Bitirme Projesi",
      isCapstone: true,
      details: [
        "İşe alım süreçleri analiz edilerek, kriter tabanlı, sistematik ve ölçeklenebilir bir aday değerlendirme modeli geliştirildi.",
        "Çalışan performansının analizinde SWARA, CODAS ve COPRAS yöntemleri karşılaştırmalı olarak uygulandı.",
        "Web tabanlı başvuru sistemi tasarlanarak dış yazılım ihtiyacı ortadan kaldırıldı, insan kaynakları süreçlerinin etkinliği artırıldı."
      ]
    },
    {
      id: 2,
      title: "Telekomünikasyon Sektöründe Kurumsal Strateji Geliştirme ve Rekabet Analizi",
      subtitle: "",
      isCapstone: false,
      details: [
        "Bir telekomünikasyon şirketi için PESTEL ve rakip analizleri yapılarak; kurumsal, iş birimi ve fonksiyonel düzeyde uygulanabilir stratejiler geliştirildi."
      ]
    },
    {
      id: 3,
      title: "Karar Ağacı Algoritması Kullanarak Asteroid Tehdit Sınıflandırması ve Analizi",
      subtitle: "",
      isCapstone: false,
      highlightStat: { value: "%96", label: "Doğruluk Oranı" },
      details: [
        "NASA'nın NEO verisetinden elde edilen asteroid verileri kullanılarak karar ağacı algoritmasıyla çarpma riski sınıflandırılmış ve %96 doğruluk oranına sahip model geliştirildi."
      ]
    }
  ]
};
