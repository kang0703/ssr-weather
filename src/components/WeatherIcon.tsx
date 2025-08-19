interface WeatherIconProps {
  icon: string;
  size?: number;
  className?: string;
}

export default function WeatherIcon({ icon, size = 64, className = '' }: WeatherIconProps) {
  const getWeatherSVG = (iconCode: string) => {
    // OpenWeatherMap 아이콘 코드에 따른 SVG 아이콘
    const icons: { [key: string]: string } = {
      // 맑음 (Clear)
      '01d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
        <g fill="#FFD700">
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </g>
      </svg>`,
      '01n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3a6 6 0 0 0 6 6 6 6 0 0 0-6 6 6 6 0 0 0-6-6 6 6 0 0 0 6-6z" fill="#F0F8FF"/>
        <circle cx="12" cy="12" r="3" fill="#FFD700"/>
      </svg>`,
      
      // 구름 조금 (Few clouds)
      '02d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
        <path d="M8 15a4 4 0 0 1 8 0" fill="#E6E6FA" stroke="#C0C0C0" stroke-width="1"/>
        <g fill="#FFD700">
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
        </g>
      </svg>`,
      '02n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3a6 6 0 0 0 6 6 6 6 0 0 0-6 6 6 6 0 0 0-6-6 6 6 0 0 0 6-6z" fill="#F0F8FF"/>
        <circle cx="12" cy="12" r="3" fill="#FFD700"/>
        <path d="M8 15a4 4 0 0 1 8 0" fill="#E6E6FA" stroke="#C0C0C0" stroke-width="1"/>
      </svg>`,
      
      // 구름 많음 (Scattered clouds)
      '03d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 14a4 4 0 0 1 8 0" fill="#E6E6FA" stroke="#C0C0C0" stroke-width="1"/>
        <path d="M10 16a3 3 0 0 1 6 0" fill="#E6E6FA" stroke="#C0C0C0" stroke-width="1"/>
      </svg>`,
      '03n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 14a4 4 0 0 1 8 0" fill="#E6E6FA" stroke="#C0C0C0" stroke-width="1"/>
        <path d="M10 16a3 3 0 0 1 6 0" fill="#E6E6FA" stroke="#C0C0C0" stroke-width="1"/>
      </svg>`,
      
      // 흐림 (Broken clouds)
      '04d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12a5 5 0 0 1 10 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M8 14a4 4 0 0 1 8 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M12 16a3 3 0 0 1 6 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
      </svg>`,
      '04n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12a5 5 0 0 1 10 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M8 14a4 4 0 0 1 8 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M12 16a3 3 0 0 1 6 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
      </svg>`,
      
      // 비 (Rain)
      '09d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M8 6l-1 4M12 6l-1 4M16 6l-1 4" stroke="#87CEEB" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      '09n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M8 6l-1 4M12 6l-1 4M16 6l-1 4" stroke="#87CEEB" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      
      // 비 (Rain)
      '10d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M8 6l-1 4M12 6l-1 4M16 6l-1 4" stroke="#87CEEB" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      '10n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M8 6l-1 4M12 6l-1 4M16 6l-1 4" stroke="#87CEEB" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      
      // 천둥번개 (Thunderstorm)
      '11d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M12 4l-2 6h4l-2 6" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
      </svg>`,
      '11n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <path d="M12 4l-2 6h4l-2 6" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
      </svg>`,
      
      // 눈 (Snow)
      '13d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <circle cx="8" cy="6" r="1" fill="white"/>
        <circle cx="12" cy="6" r="1" fill="white"/>
        <circle cx="16" cy="6" r="1" fill="white"/>
        <circle cx="10" cy="8" r="1" fill="white"/>
        <circle cx="14" cy="8" r="1" fill="white"/>
      </svg>`,
      '13n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12a6 6 0 0 1 12 0" fill="#D3D3D3" stroke="#A9A9A9" stroke-width="1"/>
        <circle cx="8" cy="6" r="1" fill="white"/>
        <circle cx="12" cy="6" r="1" fill="white"/>
        <circle cx="16" cy="6" r="1" fill="white"/>
        <circle cx="10" cy="8" r="1" fill="white"/>
        <circle cx="14" cy="8" r="1" fill="white"/>
      </svg>`,
      
      // 안개 (Mist/Fog)
      '50d': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10a8 8 0 0 1 16 0" fill="#F5F5F5" stroke="#D3D3D3" stroke-width="1"/>
        <path d="M6 14a6 6 0 0 1 12 0" fill="#F5F5F5" stroke="#D3D3D3" stroke-width="1"/>
        <path d="M8 18a4 4 0 0 1 8 0" fill="#F5F5F5" stroke="#D3D3D3" stroke-width="1"/>
      </svg>`,
      '50n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10a8 8 0 0 1 16 0" fill="#F5F5F5" stroke="#D3D3D3" stroke-width="1"/>
        <path d="M6 14a6 6 0 0 1 12 0" fill="#F5F5F5" stroke="#D3D3D3" stroke-width="1"/>
        <path d="M8 18a4 4 0 0 1 8 0" fill="#F5F5F5" stroke="#D3D3D3" stroke-width="1"/>
      </svg>`,
    };

    return icons[iconCode] || icons['01d']; // 기본값: 맑음
  };

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: getWeatherSVG(icon) }}
    />
  );
}
