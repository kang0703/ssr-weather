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
      '01d': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --sun-core: #FFC107;
            --sun-ray: #FFECB3;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --sun-core: #FFD54F;
              --sun-ray: #FFB300;
            }
          }
          .ray { transform-origin: 32px 32px; animation: rotate 8s linear infinite; }
          @keyframes rotate { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        </style>
        <g class="ray" fill="var(--sun-ray)">
          <rect x="30" y="2" width="4" height="12" rx="2"/>
          <rect x="30" y="50" width="4" height="12" rx="2"/>
          <rect x="2"  y="30" width="12" height="4" rx="2"/>
          <rect x="50" y="30" width="12" height="4" rx="2"/>
          <rect x="8"  y="8"  width="4" height="12" rx="2" transform="rotate(45 10 14)"/>
          <rect x="52" y="52" width="4" height="12" rx="2" transform="rotate(45 54 58)"/>
          <rect x="8"  y="44" width="4" height="12" rx="2" transform="rotate(-45 10 50)"/>
          <rect x="52" y="12" width="4" height="12" rx="2" transform="rotate(-45 54 18)"/>
        </g>
        <circle cx="32" cy="32" r="12" fill="var(--sun-core)"/>
      </svg>`,
      '01n': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3a6 6 0 0 0 6 6 6 6 0 0 0-6 6 6 6 0 0 0-6-6 6 6 0 0 0 6-6z" fill="#F0F8FF"/>
        <circle cx="12" cy="12" r="3" fill="#FFD700"/>
      </svg>`,
      
      // 구름 조금 (Few clouds)
      '02d': `<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <title>Animated Cloud</title>
        <g>
          <!-- 구름 모양 -->
          <ellipse cx="60" cy="60" rx="35" ry="25" fill="#B0C4DE" />
          <ellipse cx="45" cy="55" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="75" cy="55" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="60" cy="50" rx="25" ry="18" fill="#B0C4DE" />

          <!-- 좌우 흔들리는 애니메이션 -->
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="translate" 
            values="-5 0; 5 0; -5 0" 
            dur="2s" 
            repeatCount="indefinite" />
        </g>
      </svg>`,
      '02n': `<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <title>Animated Cloud</title>
        <g>
          <!-- 구름 모양 -->
          <ellipse cx="60" cy="60" rx="35" ry="25" fill="#B0C4DE" />
          <ellipse cx="45" cy="55" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="75" cy="55" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="60" cy="50" rx="25" ry="18" fill="#B0C4DE" />

          <!-- 좌우 흔들리는 애니메이션 -->
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="translate" 
            values="-5 0; 5 0; -5 0" 
            dur="2s" 
            repeatCount="indefinite" />
        </g>
      </svg>`,
      
      // 구름 많음 (Scattered clouds)
      '03d': `<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <title>Animated Cloud</title>
        <g>
          <!-- 구름 모양 -->
          <ellipse cx="60" cy="60" rx="35" ry="25" fill="#B0C4DE" />
          <ellipse cx="45" cy="55" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="75" cy="55" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="60" cy="50" rx="25" ry="18" fill="#B0C4DE" />

          <!-- 좌우 흔들리는 애니메이션 -->
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="translate" 
            values="-5 0; 5 0; -5 0" 
            dur="2s" 
            repeatCount="indefinite" />
        </g>
      </svg>`,
      '03n': `<svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <title>Animated Cloud</title>
        <g>
          <!-- 구름 모양 -->
          <ellipse cx="60" cy="55" rx="35" ry="25" fill="#B0C4DE" />
          <ellipse cx="45" cy="50" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="75" cy="50" rx="20" ry="15" fill="#B0C4DE" />
          <ellipse cx="60" cy="45" rx="25" ry="18" fill="#B0C4DE" />

          <!-- 좌우 흔들리는 애니메이션 -->
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="translate" 
            values="-5 0; 5 0; -5 0" 
            dur="2s" 
            repeatCount="indefinite" />
        </g>
      </svg>`,
      
      // 흐림 (Broken clouds) - size prop을 올바르게 적용
      '04d': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud: #CFD8DC;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud: #455A64;
            }
          }
          .drift { animation: drift 6s ease-in-out infinite; }
          @keyframes drift {
            0%,100% { transform: translateX(0); }
            50%   { transform: translateX(8px); }
          }
        </style>
        <g class="drift" fill="var(--cloud)">
          <ellipse cx="24" cy="36" rx="14" ry="10"/>
          <ellipse cx="38" cy="32" rx="16" ry="12"/>
          <ellipse cx="44" cy="40" rx="12" ry="8"/>
        </g>
      </svg>`,
      '04n': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud: #CFD8DC;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud: #455A64;
            }
          }
          .drift { animation: drift 6s ease-in-out infinite; }
          @keyframes drift {
            0%,100% { transform: translateX(0); }
            50%   { transform: translateX(8px); }
          }
        </style>
        <g class="drift" fill="var(--cloud)">
          <ellipse cx="24" cy="36" rx="14" ry="10"/>
          <ellipse cx="38" cy="32" rx="16" ry="12"/>
          <ellipse cx="44" cy="40" rx="12" ry="8"/>
        </g>
      </svg>`,
      
      // 비 (Rain)
      '09d': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud: #B0BEC5;
            --drop:  #4FC3F7;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud: #37474F;
              --drop:  #29B6F6;
            }
          }
          .drop { animation: drop 1s ease-in-out infinite; }
          .drop:nth-child(2) { animation-delay: 0.3s; }
          .drop:nth-child(3) { animation-delay: 0.6s; }
          @keyframes drop {
            0%   { transform: translateY(0); opacity: 0; }
            50%  { opacity: 1; }
            100% { transform: translateY(16px); opacity: 0; }
          }
        </style>
        <ellipse cx="32" cy="28" rx="18" ry="12" fill="var(--cloud)"/>
        <g fill="var(--drop)">
          <circle class="drop" cx="24" cy="48" r="4"/>
          <circle class="drop" cx="32" cy="52" r="4"/>
          <circle class="drop" cx="40" cy="48" r="4"/>
        </g>
      </svg>`,
      '09n': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud: #B0BEC5;
            --drop:  #4FC3F7;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud: #37474F;
              --drop:  #29B6F6;
            }
          }
          .drop { animation: drop 1s ease-in-out infinite; }
          .drop:nth-child(2) { animation-delay: 0.3s; }
          .drop:nth-child(3) { animation-delay: 0.6s; }
          @keyframes drop {
            0%   { transform: translateY(0); opacity: 0; }
            50%  { opacity: 1; }
            100% { transform: translateY(16px); opacity: 0; }
          }
        </style>
        <ellipse cx="32" cy="28" rx="18" ry="12" fill="var(--cloud)"/>
        <g fill="var(--drop)">
          <circle class="drop" cx="24" cy="48" r="4"/>
          <circle class="drop" cx="32" cy="52" r="4"/>
          <circle class="drop" cx="40" cy="48" r="4"/>
        </g>
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
      '11d': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud:  #B0BEC5;
            --bolt:   #FFC107;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud:  #37474F;
              --bolt:   #FFB300;
            }
          }
          .flash { animation: flash 1s steps(2,end) infinite; }
          @keyframes flash {
            0%,100% { opacity: 0; }
            50%     { opacity: 1; }
          }
        </style>
        <ellipse cx="32" cy="28" rx="18" ry="12" fill="var(--cloud)"/>
        <polygon class="flash" points="28,34 36,34 30,48 38,48 30,62" fill="var(--bolt)"/>
      </svg>`,
      '11n': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud:  #B0BEC5;
            --bolt:   #FFC107;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud:  #37474F;
              --bolt:   #FFB300;
            }
          }
          .flash { animation: flash 1s steps(2,end) infinite; }
          @keyframes flash {
            0%,100% { opacity: 0; }
            50%     { opacity: 1; }
          }
        </style>
        <ellipse cx="32" cy="28" rx="18" ry="12" fill="var(--cloud)"/>
        <polygon class="flash" points="28,34 36,34 30,48 38,48 30,62" fill="var(--bolt)"/>
      </svg>`,
      
      // 눈 (Snow)
      '13d': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud: #ECEFF1;
            --flake: #90A4AE;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud: #263238;
              --flake: #B0BEC5;
            }
          }
          .flake { animation: fall 3s linear infinite; }
          .flake:nth-child(2) { animation-delay: 1s; }
          .flake:nth-child(3) { animation-delay: 2s; }
          @keyframes fall {
            0%   { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(24px); opacity: 0; }
          }
        </style>
        <ellipse cx="32" cy="28" rx="18" ry="10" fill="var(--cloud)"/>
        <g stroke="var(--flake)" stroke-width="2">
          <line class="flake" x1="24" y1="46" x2="24" y2="54"/>
          <line class="flake" x1="24" y1="50" x2="20" y2="50"/>
          <line class="flake" x1="24" y1="50" x2="28" y2="50"/>
          <line class="flake" x1="32" y1="50" x2="32" y2="58"/>
          <line class="flake" x1="32" y1="54" x2="28" y2="54"/>
          <line class="flake" x1="32" y1="54" x2="36" y2="54"/>
          <line class="flake" x1="40" y1="46" x2="40" y2="54"/>
          <line class="flake" x1="40" y1="50" x2="36" y2="50"/>
          <line class="flake" x1="40" y1="50" x2="44" y2="50"/>
        </g>
      </svg>`,
      '13n': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --cloud: #ECEFF1;
            --flake: #90A4AE;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --cloud: #263238;
              --flake: #B0BEC5;
            }
          }
          .flake { animation: fall 3s linear infinite; }
          .flake:nth-child(2) { animation-delay: 1s; }
          .flake:nth-child(3) { animation-delay: 2s; }
          @keyframes fall {
            0%   { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(24px); opacity: 0; }
          }
        </style>
        <ellipse cx="32" cy="28" rx="18" ry="10" fill="var(--cloud)"/>
        <g stroke="var(--flake)" stroke-width="2">
          <line class="flake" x1="24" y1="46" x2="24" y2="54"/>
          <line class="flake" x1="24" y1="50" x2="20" y2="50"/>
          <line class="flake" x1="24" y1="50" x2="28" y2="50"/>
          <line class="flake" x1="32" y1="50" x2="32" y2="58"/>
          <line class="flake" x1="32" y1="54" x2="28" y2="54"/>
          <line class="flake" x1="32" y1="54" x2="36" y2="54"/>
          <line class="flake" x1="40" y1="46" x2="40" y2="54"/>
          <line class="flake" x1="40" y1="50" x2="36" y2="50"/>
          <line class="flake" x1="40" y1="50" x2="44" y2="50"/>
        </g>
      </svg>`,
      
      // 안개 (Mist/Fog)
      '50d': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --fog: #B0BEC5;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --fog: #546E7A;
            }
          }
          .line { animation: pulse 4s ease-in-out infinite; }
          .line:nth-child(2) { animation-delay: 1s; }
          .line:nth-child(3) { animation-delay: 2s; }
          @keyframes pulse {
            0%,100% { opacity: 0.3; }
            50%    { opacity: 0.6; }
          }
        </style>
        <g stroke="var(--fog)" stroke-width="4" stroke-linecap="round">
          <line class="line" x1="12" y1="32" x2="52" y2="32"/>
          <line class="line" x1="8"  y1="40" x2="56" y2="40"/>
          <line class="line" x1="16" y1="48" x2="48" y2="48"/>
        </g>
      </svg>`,
      '50n': `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root {
            --fog: #B0BEC5;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --fog: #546E7A;
            }
          }
          .line { animation: pulse 4s ease-in-out infinite; }
          .line:nth-child(2) { animation-delay: 1s; }
          .line:nth-child(3) { animation-delay: 2s; }
          @keyframes pulse {
            0%,100% { opacity: 0.3; }
            50%    { opacity: 0.6; }
          }
        </style>
        <g stroke="var(--fog)" stroke-width="4" stroke-linecap="round">
          <line class="line" x1="12" y1="32" x2="52" y2="32"/>
          <line class="line" x1="8"  y1="40" x2="56" y2="40"/>
          <line class="line" x1="16" y1="48" x2="48" y2="48"/>
        </g>
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
