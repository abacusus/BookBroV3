import React, { useState,useEffect} from "react";
import {
  FaUserCircle,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa"; 
// import HTMLFlipBook from 'page-flip';
import HTMLFlipBook from 'react-pageflip';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import './Home.css';






const Home = () => { 
   useEffect(() => {
    AOS.init({
      duration: 1000,     // default duration for animations
      once: false,        // whether animation should happen only once
      mirror: true        // animate on scroll up
    });
  }, []);
 const [isHeaderVisible, setIsHeaderVisible] = useState(true);
 const [lastScrollY, setLastScrollY] = useState(0);

 useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 10);
    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, [lastScrollY]);



  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (

   <div >   
   <div className="relative min-h-screen text-black overflow-x-hidden bg-white">
      {/* Decorative Blur Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0"></div>

      {/* Floating Header */}
      <header
  className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-4xl rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-black/30 px-6 py-4 flex justify-between items-center transition-transform duration-300 ${
    isHeaderVisible ? "translate-y-0" : "-translate-y-[150%]"
  }`}
>



        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <h1 className="text-black text-xl font-bold">BookBro</h1>
        </div>

        {/* Center GIF */}
        <div className="hidden md:block">
          <img
            src="book.gif"
            alt="Animated book"
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
          
          <a href="/list" className="flex items-center gap-1 hover:underline">
            <FaShoppingCart /> Buy
          </a>
          <a href="/books" className="flex items-center gap-1 hover:underline">
            <FaDollarSign /> Sell
          </a>
          <a href="/login" className="flex items-center gap-1 hover:underline">
            <FaUserCircle /> Login
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-xl text-black focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed top-[90px] left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-4xl bg-white/80 backdrop-blur-md shadow-md border border-black/20 rounded-xl px-6 py-4 flex flex-col space-y-3 md:hidden text-base font-medium">
          <a href="/list" className="hover:underline">Buy</a>
          <a href="/books" className="hover:underline">Sell</a>
          <a href="/login" className="hover:underline">Login</a>
        </div>
      )}
        
<div
  className="sticky top-0 h-screen flex flex-col items-center  bg-cover bg-center"
  style={{ backgroundImage: "url('trees.png')" }}
>   <h1 className=" pt-20 mx-1 text-3xl font-bold font-mono italic masked-text">
    Welcome to BookBro – Your Gateway to Books!
  </h1>
<div className="absolute right-0 top-1/2 px-2" data-aos="fade-left" data-aos-delay="700">
  <h1 className="text-5xl font-bold text-white/75 drop-shadow-lg ">
  DO YOU KNOW ?
</h1></div>


 <div className="absolute right-0 top-2/3 px-2" data-aos="fade-left" data-aos-delay="2000">
  <h1 className="text-5xl font-bold text-black/45 drop-shadow-lg ">
  4 billion trees are cut down every year for paper production
</h1></div>


</div>
        
      
    </div>
     <div className="relative">
      <div className="flex justify-center py-12 px-12   border-gray-300 rounded-lg shadow-lg">
<HTMLFlipBook
  width={250}
  height={250}
  size="stretch"
  minWidth={250}
  maxWidth={1000}
  minHeight={200}
  maxHeight={1536}
  drawShadow={true}
  maxShadowOpacity={0.5}
  showCover={false}
  mobileScrollSupport={true}
  className="shadow-2xl shadow-gray-600 rounded-xl"
  style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
>
  {/* Page 1 - Quotes */}
  <div className="page bg-white p-6 border rounded-l-lg shadow-lg flex flex-col justify-center">
     <div className="page border rounded-r-lg shadow-lg p-0">
  <img
    src="https://images.squarespace-cdn.com/content/v1/55a7632ae4b0aa35869ce84a/d14494e6-1559-4d24-a1bf-06bfa93eae53/Impact+of+Deforestation+Still+3+4K.jpg"
    alt="Deforestation Impact"
    className="w-full h-full object-cover rounded-r-lg"
    style={{ display: "block" }}
  />
</div >
   <div className="text-base sm:text-lg md:text-2xl mt-10 lg:text-3xl text-center text-gray-700 italic px-4 max-w-4xl mx-auto mb-8">
<p className="w-full break-words overflow-hidden text-ellipsis" >
  “  Each sheet of paper tells two stories — one printed, one of a tree lost.  ”
</p>
</div>
   
  </div>

  {/* Page 2 - Image */}
   <div className="page bg-white p-6 border rounded-l-lg shadow-lg flex flex-col justify-center">
    
  <img
    src={"book-tree.png"}
    alt="Deforestation Impact"
    className="w-full h-[60%] object-cover rounded-r-lg"
    style={{ display: "block" }}
  />

   <div className="text-center text-gray-700 italic px-2 max-w-4xl mx-auto my-8">
  <p className="text-base sm:text-lg md:text-2xl lg:text-3xl leading-snug sm:leading-normal md:leading-relaxed w-full break-words">
      Every year, 4 billion trees fall to feed our paper habits. 
  </p>
</div>

  </div>

  {/* Page 3 - Placeholder */}
  <div className="page bg-white p-6 border rounded-l-lg shadow-lg flex flex-col justify-center">
     <div className="page border rounded-r-lg shadow-lg p-0">
  <img
    src={"0.png"}
    alt="Deforestation Impact"
    className="w-full h-[100%] object-cover rounded-r-lg"
    style={{ display: "block" }}
  />
</div >
   <div className="text-base sm:text-lg md:text-2xl mt-10 lg:text-3xl text-center text-grey-700 italic px-4 max-w-4xl mx-auto mb-8">
<p >
  “  Humans are turning forests into folders, and nature into notes.  ”
</p>
</div>
   
  </div>

  {/* Page 4 - Placeholder */}
   <div className="page bg-white p-6 border rounded-l-lg shadow-lg flex flex-col justify-center">
     <div className="page border rounded-r-lg shadow-lg p-0">
  <img
    src="https://www.aramani.in/Content/TrackAppMedia/ContentWrite/3/c5f755e20bb34ef785483dc779f40898-14-06-2019-11-33-39.png"
    alt="Deforestation Impact"
    className="w-full h-full object-cover rounded-r-lg"
    style={{ display: "block" }}
  />
</div >
   <div className="text-base sm:text-lg md:text-2xl mt-16 lg:text-3xl text-center text-green-700 italic px-4 max-w-4xl mx-auto mb-8">
<p >
  “  Nature is not a place to visit — it’s home.  ”
</p>
</div>
   
  </div>
</HTMLFlipBook>

</div>
  

  <div
  className=" top-0 h-screen flex flex-col items-center justify-center text-white bg-cover bg-center bg-no-repeat relative"
  style={{
    backgroundImage:  `url("mountain.jpg")`,
  }}
>
  <div className=" py-16 px-6 md:px-20" >
  <div className="max-w-4xl mx-auto text-center">
    <h2
      className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white/50 mb-6"
      data-aos="fade-up"
      data-aos-delay="1950"
      dataos-offset="0"
      dataos-duration="1000"
    >
      What We Are
    </h2>
    <p
      className="text-lg text-gray-600 dark:text-gray-300 mb-12"
      data-aos="fade-up"
      data-aos-delay="2050"
      dataos-duration="1000"
    >
      We are an eco-conscious organization committed to reducing paper waste and deforestation through sustainable technology.
    </p>

    <h2
      className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white/50 mb-6"
      data-aos="fade-up"
      data-aos-delay="2800"
      dataos-duration="500"
    >
      What We Do
    </h2>
    <p
      className="text-lg text-gray-600 dark:text-gray-300"
      data-aos="fade-up"
      data-aos-delay="3000"
      dataos-duration="500"
    >
      We provide digital solutions that help businesses and individuals reduce their reliance on paper, planting trees for every milestone achieved.
    </p>
  </div>
</div>

</div>


  <div
  className=" top-0 h-screen flex flex-col items-center justify-center text-white bg-cover bg-center bg-no-repeat relative"
  style={{
    backgroundImage: "url('cave.jpg')"
  }}
><div className=" py-16 px-6 md:px-20" >
  <div className="max-w-4xl mx-auto text-center">
    <h2
      className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white/50 mb-6"
      data-aos="fade-up"
      data-aos-delay="1950"
      
      dataos-duration="1000"
    >
      About Us
    </h2>
    <p
      className="text-lg text-gray-600 dark:text-gray-300 mb-12"
      data-aos="fade-up"
      data-aos-delay="3000"
      dataos-duration="780"
    >
      We’re a bunch of book lovers who hate seeing good stories gather dust—or worse, end up in the trash. That’s why we started this platform: to help you resell your books easily and give them a second chance in someone else’s hands.

Every book you pass on helps reduce waste, save trees, and build a more sustainable reading community. It’s simple: share stories, clear your shelf, and help the planet at the same time.

Join us on this mission to make reading a little greener!
    </p>

  
  </div>
</div>
  
</div>


  <div className=" flex flex-col items-center justify-center bg-gradient-to-b from-[#301934] to-grey min-h-screen text-white">


     {/* Search Bar */}
 <div className="w-full max-w-md mx-auto mt-8">
  <div className="flex items-center border border-gray-300 rounded-full shadow-sm overflow-hidden">
    <input
      id="search"
      type="text"
      placeholder="Search books..."
      className="w-full px-4 py-2 text-gray-700 focus:outline-none"
    />
   <a href="/list"> <button className="bg-darkviolet hover:bg-violet-800 text-white px-4 py-2 rounded-r-full">
      Search
    </button></a>
  </div>
</div>

<br></br>




    <div className="w-full max-w-6xl mx-auto p-6 border-2 rounded-xl shadow-md bg-white/35 backdrop-blur-lg">
 

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
    
      <a href="/list">
 <div className="h-40 w-full flex items-center justify-center overflow-hidden rounded-lg border bg-transparent shadow hover:shadow-md transition">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEHShDmmjXR9_48FHYIPC__FdN4eTorJydw&s"
    alt="Book Cover"
    className="h-full object-contain"
  />
</div></a>
  
<a href="/list">
 <div className="h-40 w-full flex items-center justify-center overflow-hidden rounded-lg border bg-transparent shadow hover:shadow-md transition">
  <img
    src="https://m.media-amazon.com/images/I/81+Eh-enKAL.jpg"
    alt="Book Cover"
    className="h-full object-contain"
  />
</div></a>

<a href="/list">
<div className="h-40 w-full flex items-center justify-center overflow-hidden rounded-lg border bg-transparent shadow hover:shadow-md transition">
  <img
    src="https://thebookmasters.in/cdn/shop/files/NCERTScience_Math10.jpg?v=1718782068"
    alt="Book Cover"
    className="h-full object-contain"
  />
</div></a>

  </div>

  {/* More Button */}
  <a href="/list" className="flex justify-center">
  <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded-full shadow-md">
    MORE
  </button>
</a>

</div>


  </div>
</div>
    </div>
  );
}

export default Home;
