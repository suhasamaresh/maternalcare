import React from 'react';

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => (
  <div className="relative group p-6 max-w-xs mx-auto">
    <div className="absolute inset-5 rounded-lg border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative bg-white rounded-lg p-6">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  </div>
);

const CardComponent: React.FC = () => {
  const cards = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 1',
      description: 'This is a description for card 1.',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 2',
      description: 'This is a description for card 2.',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 3',
      description: 'This is a description for card 3.',
    },
  ];

  return (
    <div className="flex flex-wrap justify-around space-y-4 sm:space-y-0 sm:space-x-4 p-8">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default CardComponent;
