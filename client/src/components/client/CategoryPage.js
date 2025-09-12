// src/components/client/CategoryPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./CategoryPage.css";
import ClientProfileIcon from "./ClientProfileIcon";
const categoryData = {
  embroidery: {
    name: "Embroidery",
    subServices: [
      { id: "hand", name: "Hand Embroidery", description:'Intricate designs done manually using a needle and thread, allowing for personalization and unique touches.', image: "/assets/Subservices/Embrioderyservices/handembriodery.jpg" },
      { id: "machine", name: "Machine Embroidery", description:'Uses specialized sewing machines to create designs quickly and consistently, often used for larger projects.', image: "/assets/Subservices/Embrioderyservices/machineembriodery.webp" },
      { id: "pearl", name: "Pearl Embroidery", description:'Intricate needlework adding beauty to wedding attire with delicate stitching and patterns.', image: "/assets/Subservices/Embrioderyservices/pearlembriodery.jpg" },
    ],
  },
  "home-cooked-food": {
    name: "Home Cooked Food",
    subServices: [
      { id: "south-indian", name: "South Indian Meals",description:'Authentic South Indian cuisine: dosa, idli, sambar, vada & more, made with fresh ingredients & aromatic spices.', image: "/assets/Subservices/homebasedfoods/southindian.jpg" },
      { id: "north-indian", name: "North Indian Meals", description:'Rich North Indian cuisine: tandoori delights, creamy curries, and aromatic basmati rice.', image: "/assets/Subservices/homebasedfoods/northindian.jfif" },
      { id: "snacks", name: "Snacks",description:'Delicious Indian snacks: crispy samosas, flavorful chaat, and savory pakoras.', image: "/assets/Subservices/homebasedfoods/snacks.webp" },
    ],
  },
  gifts: {
    name: "Custom Gifts",
    subServices: [
      { id: "handmadegifts", name: "Handmade Gifts",description:'Exquisite handmade gifts: crafted with love, personalized with care, and infused with unique charm.', image: "/assets/Subservices/gifts/handmadegifts.jpg" },
      { id: "birthdaygifts", name: "Birthday Gifts",description:'Birthday magic in every gift: personalized, thoughtful, and unforgettable.', image: "/assets/Subservices/gifts/birthdaygifts.jpg" },
      { id: "weddinggifts", name: "Wedding Gifts",description:'Love-filled wedding gifts: thoughtful, elegant, and treasured forever.', image: "/assets/Subservices/gifts/weddinggifts.jpg" },
      { id: "anniversarygifts", name: "Anniversary Gifts",description:' thoughtful gestures to celebrate your love, personalized and memorable.', image: "/assets/Subservices/gifts/anniversarygifts.webp" },

    ],
  },
  "Arts&Crafts": {
    name: "Arts & Crafts",
    subServices: [
      { id: "paintings", name: "Paintings",description:'Custom paintings that reflect your personality. Vibrant abstracts to realistic portraits, crafted with skill and artistry', image: "/assets/Subservices/arts&crafts/painting.jpg" },
      { id: "papercrafting", name: "Paper Crafting",description:'Intricate paper designs crafted with precision. Quilling, origami, and paper cutting create unique decorative pieces.', image: "/assets/Subservices/arts&crafts/papercrafting.webp" },
      { id: "claymodeling", name: "Clay Modeling",description:'Handmade clay figurines and decor crafted with detail. Whimsical characters to elegant pieces, each one a work of art.', image: "/assets/Subservices/arts&crafts/claymodelling.webp" },
      { id: "collagemaking", name: "Collage Making",description:'Unique collages created with mixed media. Textures, colors, and materials combine to produce stunning visual effects.', image: "/assets/Subservices/arts&crafts/collagemaking.jpg" },
    ],
  },
  "Fashion&Tailoring": {
    name: "Fashion & Tailoring",
    subServices: [
      { id: "ladies-wear", name: "Ladies Wear",description:'Exquisite garments crafted with precision, from elegant sarees to stylish kurtas and western wear.', image: "/assets/Subservices/fashion&tailoring/womenwear.jpg" },
      { id: "mens-wear", name: "Men’s Wear",description:'Custom-fit shirts, suits, and trousers tailored to perfection for the modern man.', image: "/assets/Subservices/fashion&tailoring/menwear.jpg" },
      { id: "kids-wear", name: "Kids Wear",description:'Adorable outfits tailored for little ones, ensuring comfort, style, and perfect fit.', image: "/assets/Subservices/fashion&tailoring/kidwear.webp" },
      { id: "ethnic-wear", name: "Ethnic Wear",description:'Intricately designed ethnic outfits, including sarees, lehengas, and sherwanis, stitched with care and attention to detail.', image:"/assets/Subservices/fashion&tailoring/ethnicwear.webp" },
    ],
  },
  "Beauty&Wellness": {
    name: "Beauty & Wellness",
    subServices: [
      { id: "bridal-makeup", name: "Bridal Makeup",description:'Transform into the beauty of your dreams on your special day. Our expert makeup artists craft flawless, long-lasting looks that enhance your natural beauty.', image: "/assets/Subservices/beauty&wellness/bridalmakeup.webp" },
      { id: "skincare", name: "Skin Care",description:'Glow from within with our personalized skin care services. From facials to treatments, our experts help you achieve healthy, radiant skin.', image: "/assets/Subservices/beauty&wellness/skincare.jpg" },
      { id: "haircare", name: "Hair Care",description:'Nourish your locks with our expert hair care services. From treatments to styling, our professionals ensure your hair looks and feels its best.', image: "/assets/Subservices/beauty&wellness/haircare.jpg" },
      { id: "manicure-pedicure", name: "Manicure & Pedicure",description:'Pamper your hands and feet with our luxurious mani-pedi services. Expert nail care and pampering for a polished look and feel.', image: "/assets/Subservices/beauty&wellness/manicure&pedicure.webp" },
      { id: "full-body-massage", name: "Full Body Massage",description:'Indulge in blissful relaxation with our full-body massage services. Our skilled therapists melt away stress and tension, leaving you refreshed and rejuvenated.', image: "/assets/Subservices/beauty&wellness/bodymassage.jpg" },
    ],
  },
  "Tutoring&Education": {
    name: "Tutoring & Education",
    subServices: [
      { id: "school-tuition", name: "School Tuitions", image: "/assets/SubServiceImages/school-tuition.jpg" },
      { id: "college-tuition", name: "College Subjects", image: "/assets/SubServiceImages/college-tuition.jpg" },
      { id: "spoken-english", name: "Spoken English", image: "/assets/SubServiceImages/spoken-english.jpg" },
    ],
  },
  EventDecoration: {
    name: "Event Decoration",
    subServices: [
        { id: "birthday", name: "Birthday Parties",description:'Customized birthday decorations for kids and adults, including theme parties, balloon decorations, and cake surprises.', image: "/assets/Subservices/eventdecoration/birthday.jpg" },
        { id: "wedding", name: "Wedding Decoration", description:'Elegant wedding decorations, including flower arrangements, lighting, and furniture setup', image: "/assets/Subservices/eventdecoration/wedding.jpg" },
       { id: "festivals", name: "Festival Decoration",description:'Colorful festive decorations for occasions like Diwali, Christmas, and Holi.', image: "/assets/Subservices/eventdecoration/festival.jpg" },
       { id: "anniversarydecorations", name: "Anniversary Decorations",description:'Romantic anniversary decorations, including candlelight dinners and personalized gifts.', image: "/assets/Subservices/eventdecoration/anniversary.jpg" },
       { id: "corporateeventdecorations", name: "Corporate Event Decorations",description:'Professional corporate event decorations, including setup, lighting, and audiovisual equipment', image: "/assets/Subservices/eventdecoration/corporateevent.webp" },
    ],
  },
  HomeGardeningKits: {
    name: "Home Gardening Kits",
    subServices: [
      { id: "indoorplants", name: "Indoor Plants",description:'Designed for indoor gardening, these kits include grow lights, pots, seeds, and nutrient solutions for growing plants in small spaces.', image: "/assets/Subservices/gardening/indoorplant.webp" },
      { id: "plantkits", name: "Plant Kits",description:'These kits include seeds, containers, soil, and instructions for growing various plants like herbs, vegetables, and flowers.', image: "/assets/Subservices/gardening/plantkit.jfif" },
      { id: "herbkits", name: "Herb Kits",description:' For growing herbs like basil, mint, and parsley.', image: "/assets/Subservices/gardening/herbkit.webp" },
      { id: "vegetablekits", name: "Vegetable Kits",description:'For growing vegetables like tomatoes, peppers, and lettuce.', image: "/assets/Subservices/gardening/vegetablekit.jpeg" },
      { id: "flowerkits", name: "Flower Kits",description:' For growing flowers like marigolds, sunflowers, and orchids.', image:"/assets/Subservices/gardening/flowerkit.jfif" },
      { id: "microgreenskits", name: "Microgreens Kits",description:'For growing nutrient-packed microgreens.', image: "/assets/Subservices/gardening/microgreens.jpg" },
    ],
  },
  TraditionalFestivalKits: {
    name: "Traditional Festival Kits",
    subServices: [
      { id: "puja", name: "Puja Kits",description:'A comprehensive kit containing essential items for performing puja ceremonies, including diyas, incense sticks, and sacred materials.', image: "/assets/Subservices/traditionalfestive/pujakit.jfif" },
      { id: "festivalessentials", name: "Festival Essentials",description:'A special kit for festivals like Diwali, Navratri, or Ganesh Chaturthi, containing items like idols, decorations, and sacred materials.', image: "/assets/Subservices/traditionalfestive/festiveessential.webp" },
      { id: "holifestivalkits", name: "Holi Festival Kits",description:'Traditional Holi festival kits with attractive looks, fine finish, and cost-effective pricing, available in different specifications and designs.', image: "/assets/Subservices/traditionalfestive/holi.jpg" },
      { id: "diwalifestivalkits", name: "Diwali Festival Kits",description:'Diwali festival kits and gifts, including traditional decorations and modern essentials.', image: "/assets/Subservices/traditionalfestive/diwali.jpg" },
      { id: "ganpatifestivalkits", name: "Ganpati Festival Kits",description:'Ganpati traditional garland kit with 12 pieces, including 8ft green vines and marigold garlands for home decor.', image: "/assets/Subservices/traditionalfestive/ganapathi.png" },
      { id: "festivedelightcrafts", name: "Festive Delight Crafts",description:'DIY craft kit for kids and adults, includes 5 craft activities like traditional wall hanging and neon rangoli.', image: "/assets/Subservices/traditionalfestive/festivedelightcraft.webp" },
      { id: "lotuspoojadecorationkit", name: " Lotus Pooja Decoration Kit",description:'Premium lotus-themed backdrop decoration kit with yellow curtain and pom-pom bell hangings for festivals and mandir decor.', image: "/assets/Subservices/traditionalfestive/lotusdecoration.jpg" },
    ],
  },
};

function CategoryPage() {
  const { category } = useParams();
  const categoryInfo = categoryData[category];

  if (!categoryInfo) {
    return <p>Category not found</p>;
  }

  return (
    <div className="category-page">
      <div>
      <ClientProfileIcon />
      </div>
      <h2>{categoryInfo.name} - Sub Services</h2>
      <div className="grid">
        {categoryInfo.subServices.length > 0 ? (
          categoryInfo.subServices.map((sub) => (
            <div key={sub.id} className="card">
              <img src={sub.image} alt={sub.name} />
              <h3>{sub.name}</h3>
              <p>{sub.description}</p>
              <Link to={`/services/${category}/${sub.id}`}>
                <button>View Providers</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No subservices added yet for this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
