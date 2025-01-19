"use client";
import React, { useState } from 'react';

const App: React.FC = () => {

  interface Book {
    title: string;
    author: string;
    pages: number;
    description: string;
    moreDescription: string;
    image: string;
    link: string;
  }

  const books: Book[] = [
    {
      title: "Birthing Naturally, Guidelines for childbirth",
      author: "Dr Mahima Bakshi",
      pages: 100,
      description: "In light of the many complications that arise following a Caesarean-section delivery-infections, excessive blood loss, internal scarring to name a few-more and more women are reverting to natural births. ",
      moreDescription: "More Description 1",
      link: "https://www.bookchor.com/book/9780143441809/birthing-naturally?utm_source=google&utm_medium=cpc&utm_campaign=21476536213&utm_term=&utm_content=&gad_source=1&gclid=Cj0KCQjw8MG1BhCoARIsAHxSiQnHnjRjLCge9pfpwlSukv8XtAtECAFwwauD1dVjHFc5-MUd0VB5cQMaAtMJEALw_wcB",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQIBs4KQfegZCe7mYZpSox32BlzzLsoLT2GNXrfzjpcpA71XCvD_iBo5D7G-5fwhS4FF-JKYDzM49J55593xeljpWi40yZ24yZ5sHJaHMZx&usqp=CAE",
    },

    {
      title: "The Shadow Work Journal (Paperback)",
      author: "Dr. Myra J. Wick M.D. Ph.D.",
      pages: 520,
      description: "From the childbirth experts at the Mayo Clinic comes the newly revised guide on planning for a healthy pregnancy. With detailed information about fertility, prenatal care, common pregnancy symptoms, and childbirth, this comprehensive guide will be your go-to source for answering all your ordinary—and not so ordinary—pregnancy questions. Finally, this collective effort from the obstetrics and gynecology experts at the Mayo Clinic covers new information about the latest technologies in prenatal care and childbirth, as well as details the benefits and risks involved with growing trends in childbirth, including topics like home births, placentophagy, and vaginal seeding. ",
      moreDescription: "",
      image: "https://m.media-amazon.com/images/I/712Af-xENML._AC_UY218_.jpg",
      link: "https://www.amazon.in/Mayo-Clinic-Guide-Healthy-Pregnancy/dp/1893005607/ref=sr_1_9?crid=3PBJBLM1NNL26&dib=eyJ2IjoiMSJ9.v76Z8HqQBPXY_aA1pitCV3VsiRhNW0KbRvDQCtH1weFq7JG2jFsjgE7mGRn8__94Cqqf91nLIBR5FAV6VfiCEGPIiKH3sD3EIT9uvNgQNfEEo9zPGNlOzgWAQ7JGMafNGZN1WzppYox_WkBGXY2GExRok1q3SxDKoZCUIO-oJ4X-ohHgl2OXHaBScjQQNXFLJtywjvhdgO0oZhuSvN8otmCsNRAmNNqxtusOtn-wFdU.0TCIzyhGunPQIRqmdyvZhE0jR_2O7rEAVKug-Z-56GA&dib_tag=se&keywords=pre+pregnancy+books&qid=1722857889&sprefix=prenata+l++books%2Caps%2C2424&sr=8-9",

    },

    {
      title: "Belly to Baby, A Pregnancy Memory Book",
      author: "Dipti Vora",
      pages: 36,
      description: "BELLY TO BABY: A Pregnancy Memory Book is the perfect way to document the precious memories of your pregnancy journey. We have created this modern and beautiful pregnancy memory book to record all the important photos. You will enjoy logging precious moments with notes and pictures in our special memory book. PAGES INCLUDE:Early pregnancy experience, Visits to doctors, Ultrasound photos,Baby bump journey month 1 to 9, Baby shower, Photo shoot, Delivery preparation, Baby prediction,Labor experience",
      moreDescription: "",
      image: "https://images-eu.ssl-images-amazon.com/images/I/71KM8qTSbUL._AC_UL165_SR165,165_.jpg",
      link: "https://www.amazon.in/Pregnancy-Memories-Keepsake-Journal-Scrapbook/dp/B07BVXCK35/ref=sr_1_18?crid=3PBJBLM1NNL26&dib=eyJ2IjoiMSJ9.v76Z8HqQBPXY_aA1pitCV3VsiRhNW0KbRvDQCtH1weFq7JG2jFsjgE7mGRn8__94Cqqf91nLIBR5FAV6VfiCEGPIiKH3sD3EIT9uvNgQNfEEo9zPGNlOzgWAQ7JGMafNGZN1WzppYox_WkBGXY2GExRok1q3SxDKoZCUIO-oJ4X-ohHgl2OXHaBScjQQNXFLJtywjvhdgO0oZhuSvN8otmCsNRAmNNqxtusOtn-wFdU.0TCIzyhGunPQIRqmdyvZhE0jR_2O7rEAVKug-Z-56GA&dib_tag=se&keywords=pre+pregnancy+books&qid=1722857889&sprefix=prenata+l++books%2Caps%2C2424&sr=8-18",
    },
    {
      title: "Little Miracle: 40 Weeks Pregnancy Journal",
      author: " Rahil Mansuri ",
      pages: 100,
      description: "Introducing the Little Miracle Pregnancy Journal, your ultimate companion to document and cherish every incredible moment of your pregnancy journey. From the first fluttering kicks to the anticipation of holding your little one in your arms, this journal is designed to capture every milestone, memory, and emotion along the way.",
      moreDescription: "",
      image: "https://m.media-amazon.com/images/I/71edoVR5DgL._SY425_.jpg",
      link: "https://www.amazon.in/Little-Miracle-Pregnancy-Milestones-Trimester/dp/B0CBSPSCY7/ref=pd_sbs_d_sccl_2_2/257-0010929-0873428?pd_rd_w=kwTdQ&content-id=amzn1.sym.716ad392-9d85-4575-b34c-e8d1201b1a5a&pf_rd_p=716ad392-9d85-4575-b34c-e8d1201b1a5a&pf_rd_r=QFADH2TMC4XWGHTH88G6&pd_rd_wg=udXMH&pd_rd_r=caa8aeb9-67ea-4639-916a-2d4eda7d3a61&pd_rd_i=B0CBSPSCY7&psc=1",
    },
    {
      title: "Bump to Baby Pregnancy Memory Record Book",
      author: " Almas Z. Mansuri",
      pages: 160,
      description: "Document every significant milestone and event throughout your entire 9-month journey with our 'Bump to Baby' keepsake Pregnancy journal. The journal features beautifully designed, cute, and vibrant pages, including sections such as First Ultrasound, Name Tracker, Baby Shower, Preparing Your Nursery, Hospital Bag Checklist, Letter to My Baby, Baby's Biodata, Trackers, Monthly Reflections, Pregnancy Facts, and helpful tips.",
      moreDescription: "More Description 1",
      image: "https://m.media-amazon.com/images/I/71FeAaBx6qL._SY425_.jpg",
      link: "https://www.amazon.in/Bump-Baby-Pregnancy-Milestone-Expecting/dp/B0D31R5CXL/ref=pd_sbs_d_sccl_2_2/257-0010929-0873428?pd_rd_w=9Te0s&content-id=amzn1.sym.716ad392-9d85-4575-b34c-e8d1201b1a5a&pf_rd_p=716ad392-9d85-4575-b34c-e8d1201b1a5a&pf_rd_r=S043F2WFQQFK6Q4F24WJ&pd_rd_wg=3bh8G&pd_rd_r=8322dd9e-7e64-4557-bda3-8ad77bd8e74f&pd_rd_i=B0D31R5CXL&psc=1",
    },
    {
      title: "What to Expect When You're Expecting",
      author: "Heidi Murkoff",
      pages: 150,
      description: "With 18.5 million copies in print, What to Expect When You’re Expecting is read by 93% of women who read a pregnancy book and was named one of the ‘Most Influential Books of the Last 25 Years’ by USA Today. This cover-to-cover (including the cover!) new edition is filled with must-have information, advice, insight, and tips for a new generation of mums and dads. ",
      moreDescription: "More Description 1",
      image: "https://m.media-amazon.com/images/I/810TiaIe4jL._AC_UY218_.jpg",
      link: "https://www.amazon.in/What-Expect-When-Youre-Expecting/dp/1471147533/ref=sr_1_3?crid=3PBJBLM1NNL26&dib=eyJ2IjoiMSJ9.v76Z8HqQBPXY_aA1pitCV3VsiRhNW0KbRvDQCtH1weFq7JG2jFsjgE7mGRn8__94Cqqf91nLIBR5FAV6VfiCEGPIiKH3sD3EIT9uvNgQNfEEo9zPGNlOzgWAQ7JGMafNGZN1WzppYox_WkBGXY2GExRok1q3SxDKoZCUIO-oJ4X-ohHgl2OXHaBScjQQNXFLJtywjvhdgO0oZhuSvN8otmCsNRAmNNqxtusOtn-wFdU.0TCIzyhGunPQIRqmdyvZhE0jR_2O7rEAVKug-Z-56GA&dib_tag=se&keywords=pre+pregnancy+books&qid=1722857889&sprefix=prenata+l++books%2Caps%2C2424&sr=8-3",
    },
    {
      title: "Beginning of Motherhood Garbh Sanskar",
      author: "Dr. Rohit Dhingra ",
      pages: 100,
      description: "An enlightening book, by an individual who has, through his experiences in life gained a considerable knowledge in the field of Ayurveda and a modern understanding of health. After understanding how empowering true knowledge can be, he felt inspired and compelled to share his insights through this step-by-step guide on pregnancy.",
      moreDescription: "More Description 1",
      image: "https://m.media-amazon.com/images/I/81DYiQ3CwtL._AC_UY218_.jpg",
      link: "https://www.amazon.in/Beginning-Motherhood-Holistic-Perspective-Pregnancy-ebook/dp/B0B1XNZD3V/ref=sr_1_19?crid=3PBJBLM1NNL26&dib=eyJ2IjoiMSJ9.v76Z8HqQBPXY_aA1pitCV3VsiRhNW0KbRvDQCtH1weFq7JG2jFsjgE7mGRn8__94Cqqf91nLIBR5FAV6VfiCEGPIiKH3sD3EIT9uvNgQNfEEo9zPGNlOzgWAQ7JGMafNGZN1WzppYox_WkBGXY2GExRok1q3SxDKoZCUIO-oJ4X-ohHgl2OXHaBScjQQNXFLJtywjvhdgO0oZhuSvN8otmCsNRAmNNqxtusOtn-wFdU.0TCIzyhGunPQIRqmdyvZhE0jR_2O7rEAVKug-Z-56GA&dib_tag=se&keywords=pre+pregnancy+books&qid=1722857889&sprefix=prenata+l++books%2Caps%2C2424&sr=8-19",
    },
    {
      title: "Kareena Kapoor Khan's pregnancy bible",
      author: "Kareena Kapoor, Aditi Shah Bhimjyani",
      pages: 392,
      description: "Kareena Kapoor Khan, with the help of expert voices, gives you the complete book on your pregnancy Kareena talks you through your 40 weeks, diet and fitness, self-care, preparing the nursery and even what to pack for the hospital – everything you could possibly want to know! But best of all she talks about her own pregnancies openly, from her intense morning sickness to her crazy cravings for pepperoni pizza.",
      moreDescription: "More Description 1",
      image: "https://m.media-amazon.com/images/I/713CG+JQx9L._AC_UY218_.jpg",
      link: "https://www.amazon.in/KAREENA-KAPOOR-KHANS-PREGNANCY-BIBLE/dp/939116577X/ref=sr_1_14?crid=3PBJBLM1NNL26&dib=eyJ2IjoiMSJ9.v76Z8HqQBPXY_aA1pitCV3VsiRhNW0KbRvDQCtH1weFq7JG2jFsjgE7mGRn8__94Cqqf91nLIBR5FAV6VfiCEGPIiKH3sD3EIT9uvNgQNfEEo9zPGNlOzgWAQ7JGMafNGZN1WzppYox_WkBGXY2GExRok1q3SxDKoZCUIO-oJ4X-ohHgl2OXHaBScjQQNXFLJtywjvhdgO0oZhuSvN8otmCsNRAmNNqxtusOtn-wFdU.0TCIzyhGunPQIRqmdyvZhE0jR_2O7rEAVKug-Z-56GA&dib_tag=se&keywords=pre+pregnancy+books&qid=1722857889&sprefix=prenata+l++books%2Caps%2C2424&sr=8-14",
    },
    
    {
      title: "The Shadow Work Journal (Paperback)",
      author: "The Happy Hippo",
      pages: 80,
      description: "Our Bestseller - The Pregnancy Journal We can confidently say that this is the best pregnancy journal available in the market. Don't take our word for it, just check out some reviews on our instagram page. The Pregnancy Journal covers your journey from the first pregnancy test till the arrival of the baby. It has space to capture all the sweet, little details of the nine months. ",
      moreDescription: "More Description 1",
      image: "https://m.media-amazon.com/images/I/61kD5hSGkzL._AC_UY218_.jpg",
      link: "https://www.amazon.in/Pregnancy-Journal-expecting-Mothers-Hardcover/dp/B09H68HTM6/ref=sr_1_1_sspa?crid=3PBJBLM1NNL26&dib=eyJ2IjoiMSJ9.v76Z8HqQBPXY_aA1pitCV3VsiRhNW0KbRvDQCtH1weFq7JG2jFsjgE7mGRn8__94Cqqf91nLIBR5FAV6VfiCEGPIiKH3sD3EIT9uvNgQNfEEo9zPGNlOzgWAQ7JGMafNGZN1WzppYox_WkBGXY2GExRok1q3SxDKoZCUIO-oJ4X-ohHgl2OXHaBScjQQNXFLJtywjvhdgO0oZhuSvN8otmCsNRAmNNqxtusOtn-wFdU.0TCIzyhGunPQIRqmdyvZhE0jR_2O7rEAVKug-Z-56GA&dib_tag=se&keywords=pre+pregnancy+books&qid=1722857889&sprefix=prenata+l++books%2Caps%2C2424&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    },
    {
      title: "My Pregnancy Jounel, Pregnancy Planner Set",
      author: "Alicia Souza",
      pages: 250,
      description: "The road to motherhood is one of the most eventful journey a woman can take! Each moment, day, week, month brings forth a blend of emotions that are extraordinary with their ups and downs! This journal provides you the space to create a book full of precious and fun experiences, as well as stay on track for things through your pregnancy in a joyful, creative and engaging manner! A beautiful keepsake that can be looked back upon to cherish!",
      moreDescription: "More Description 1",
      image: "https://m.media-amazon.com/images/I/61zPmfCPirL._SX569_.jpg",
      link: "https://www.amazon.in/Alicia-Souza-Pregnancy-Milestone-Maternity/dp/B097L9HMYP/ref=pd_sbs_d_sccl_2_10/257-0010929-0873428?pd_rd_w=MSRk1&content-id=amzn1.sym.716ad392-9d85-4575-b34c-e8d1201b1a5a&pf_rd_p=716ad392-9d85-4575-b34c-e8d1201b1a5a&pf_rd_r=EM7GJD7B8MWAR6C6RR5E&pd_rd_wg=WQlv6&pd_rd_r=bcb30d00-01fb-4b04-8cce-f4923ca70e89&pd_rd_i=B097L9HMYP&psc=1",
    },

  
    // Add more books as needed
  ];

  const [selectedBook, setSelectedBook] = useState<Book | null>(() => (books.length > 0 ? books[0] : null));
  
  const [visibleBooks, setVisibleBooks] = useState(5);

  const handleViewMore = () => {
    setVisibleBooks(prevVisibleBooks => prevVisibleBooks + 5);
  };
  
  return (
    <div style={{ backgroundColor: '#faeee7',padding:'50px', minHeight: '100vh' }}>
    <div className="bg-[#c3f0ca] flex justify-between items-center h-20 ">
        <div className="flex items-center space-x-20 pl-10">
          <button className="text-black">All Category</button>
          <button className="text-black">Bestseller Books</button>
          <button className="text-black">Fiction Books</button>
          <button className="text-black">Romance</button>
          <button className="text-black">Manga Books</button>
          <button className="text-black">Trading Books</button>
          <button className="text-black">Self-help</button>
          <button className="text-black">All Books</button>
        </div>
      </div>
    
    {selectedBook && (
      
      <div className="transition duration-300 ease-in-out transform hover:scale-105 p-10 mt-16 ml-auto mr-auto w-[800px] h-[480px] pl-10 bg-[#ffcfd0] rounded shadow">
        <div className="flex">
          <img src={selectedBook.image} alt={selectedBook.title} className="w-[250px] h-auto object-cover rounded mr-4" />
          <div>
            <h2 className="text-2xl font-semibold text-green-700">{selectedBook.title}</h2>
            <p className="mt-2 text-black"><strong>Author:</strong> {selectedBook?.author}</p>
            <p className="mt-2 text-black"><strong>Pages:</strong> {selectedBook?.pages}</p>
            <p className="mt-4">{selectedBook.description}</p>
            <a href={selectedBook.link} className="mt-4 inline-block px-4 py-2 bg-[#91f7a1] text-black rounded hover:bg-[#53f16b] transition duration-300">Reference Link</a>
          </div>
        </div>
      </div>
    )}
    <div className="mt-16 gap-14">
  <h2 className="text-2xl font-semibold text-green-700 mb-8">Other Books</h2>
  <div className="p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
    {books.slice(0, visibleBooks).map((book, index) => (
      <div key={index} className="transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => setSelectedBook(book)}
      >
        <img src={book.image} alt={book.title} className="w-[250px] h-[300px] object-cover rounded" />
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="mt-2 text-black"><strong>Author:</strong> {book.author}</p>
        <p className="mt-2 text-black"><strong>Pages:</strong> {book.pages}</p>
      </div>
    ))}
  </div>
  
      
        {visibleBooks < books.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleViewMore}
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition duration-300"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
);
};

export default App;