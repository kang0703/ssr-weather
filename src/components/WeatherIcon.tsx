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
      '01d': `<svg width="${size}" height="${size}" viewBox="0 0 179 179" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .sun-glow { animation: pulse 3s ease-in-out infinite; }
    .sun-rays { animation: rotate 20s linear infinite; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>
  
  <g class="sun-rays" transform-origin="90.1821 88.7404">
    <circle cx="90.1821" cy="88.7404" r="47.3348" fill="url(#paint0_radial_17_70)" class="sun-glow"/>
    <path d="M127.906 52.6987C131.75 41.3576 140.16 42.8473 145.927 45.0098C149.851 46.6918 158.229 47.2684 160.343 36.1195" stroke="#FFDF18" stroke-width="4"/>
    <path d="M140.459 82.6444C147.976 73.3224 155.358 77.6186 160.026 81.6357C163.131 84.5669 170.797 87.9948 176.623 78.2572" stroke="#FFDF18" stroke-width="4"/>
    <path d="M127.906 126.191C138.14 119.973 143.625 126.519 146.654 131.882C148.58 135.693 154.627 141.518 163.412 134.336" stroke="#FFDF18" stroke-width="4"/>
    <path d="M93.894 176.809C85.2647 168.506 90.1897 161.529 94.5994 157.229C97.7907 154.393 101.876 147.055 92.6846 140.4" stroke="#FFDF18" stroke-width="4"/>
    <path d="M2 89.1463C9.55004 79.8513 16.9161 84.1738 21.5701 88.2076C24.6643 91.1498 32.318 94.6052 38.1792 84.8885" stroke="#FFDF18" stroke-width="4"/>
    <path d="M25.3189 151.285C24.7838 139.322 33.1606 137.657 39.3189 137.579C43.5863 137.721 51.6018 135.217 49.5246 124.061" stroke="#FFDF18" stroke-width="4"/>
    <path d="M86.127 38.2589C78.6454 28.9087 84.4323 22.6274 89.3616 18.9352C92.8934 16.5357 97.8939 9.78932 89.6419 2" stroke="#FFDF18" stroke-width="4"/>
    <path d="M19.3 43.2723C29.4034 36.844 35.0231 43.2753 38.1616 48.5744C40.1657 52.3446 46.3327 58.0443 54.9675 50.6815" stroke="#FFDF18" stroke-width="4"/>
  </g>
  
  <defs>
    <radialGradient id="paint0_radial_17_70" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(90.1821 88.7404) rotate(90) scale(47.3348)">
      <stop stop-color="#F5ED00"/>
      <stop offset="1" stop-color="#FFDD1B"/>
    </radialGradient>
  </defs>
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
