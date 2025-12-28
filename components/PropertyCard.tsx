
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer relative"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider">
          {property.type}
        </div>
        {property.isVerified && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg">
            <i className="fas fa-check-circle"></i>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 property-gradient text-white">
          <p className="text-lg font-bold">
            {property.price.toLocaleString()} <span className="text-sm font-normal opacity-80">{property.currency}</span>
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
          <i className="fas fa-map-marker-alt"></i>
          <span>{property.location.city}, {property.location.country}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mb-3 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-4 text-slate-500 text-sm border-t border-slate-50 pt-4">
          <div className="flex items-center gap-1.5">
            <i className="fas fa-bed"></i>
            <span>3 Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <i className="fas fa-bath"></i>
            <span>2 Baths</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <i className="fas fa-expand-arrows-alt"></i>
            <span>1,200 sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
