import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Card from './Card';
import Button from './Button';

interface DisasterCardProps {
  title: string;
  location: string;
  date: string;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
  horizontal?: boolean;
}

const DisasterCard: React.FC<DisasterCardProps> = ({
  title,
  location,
  date,
  description,
  isActive = true,
  onClick,
  horizontal = false,
}) => {
  return (
    <Card className={`transition-all ${horizontal ? 'flex flex-col md:flex-row' : ''}`}>
      <div className={`${horizontal ? 'md:flex-1' : ''}`}>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{date}</span>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>
      </div>
      <div className={`mt-4 ${horizontal ? 'md:mt-0 md:ml-4 md:flex md:items-center' : ''}`}>
        <Button 
          variant={isActive ? 'primary' : 'secondary'}
          size="sm"
          onClick={onClick}
          className={`${horizontal ? 'md:whitespace-nowrap' : ''}`}
        >
          {isActive ? 'Saiba mais' : 'Encerrado'}
        </Button>
      </div>
    </Card>
  );
};

export default DisasterCard;