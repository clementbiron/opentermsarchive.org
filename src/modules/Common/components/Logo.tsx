import React from 'react';
import s from './Logo.module.css';

type LogoProps = {
  fill?: string;
  className?: string;
} & React.SVGAttributes<SVGElement>;

const Logo: React.FC<LogoProps> = ({ children, className, fill, ...props }: LogoProps) => {
  return (
    <div className={s.logo}>
      <svg viewBox="0 0 276 37" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M29.004 3.47847C26.2747 1.50027 23.0516 0.315342 19.6909 0.0546951C16.3302 -0.205956 12.9629 0.467827 9.9612 2.00155C6.95955 3.53527 4.44049 5.86918 2.68253 8.74525C0.924565 11.6213 -0.00382072 14.9275 1.1814e-05 18.2983C0.00384435 21.6691 0.939746 24.9732 2.70424 27.8452C4.46874 30.7173 6.9931 33.0455 9.99823 34.5723C13.0034 36.0992 16.3722 36.7654 19.7323 36.4971C23.0924 36.2288 26.3128 35.0365 29.0376 33.0521L27.6639 31.1659C25.287 32.8969 22.4777 33.9369 19.5466 34.171C16.6155 34.405 13.6767 33.8239 11.0552 32.492C8.43378 31.16 6.2317 29.1291 4.69248 26.6237C3.15325 24.1183 2.33684 21.2361 2.33349 18.2956C2.33015 15.3552 3.14001 12.4711 4.67353 9.96223C6.20706 7.45334 8.40451 5.4174 11.0229 4.07949C13.6414 2.74158 16.5788 2.15382 19.5104 2.38119C22.4421 2.60856 25.2537 3.64221 27.6346 5.36785L29.004 3.47847Z"
          fill={fill}
        />
        <path
          d="M11.9502 11.9506C11.9502 11.1741 12.5797 10.5447 13.3562 10.5447H23.9009C24.6774 10.5447 25.3069 11.1741 25.3069 11.9506C25.3069 12.7271 24.6774 13.3566 23.9009 13.3566H13.3562C12.5797 13.3566 11.9502 12.7271 11.9502 11.9506Z"
          fill={fill}
        />
        <path
          d="M11.9502 16.8715C11.9502 16.095 12.5797 15.4656 13.3562 15.4656H23.9009C24.6774 15.4656 25.3069 16.095 25.3069 16.8715C25.3069 17.648 24.6774 18.2775 23.9009 18.2775H13.3562C12.5797 18.2775 11.9502 17.648 11.9502 16.8715Z"
          fill={fill}
        />
        <path
          d="M11.9502 21.7924C11.9502 21.0159 12.5797 20.3864 13.3562 20.3864H23.9009C24.6774 20.3864 25.3069 21.0159 25.3069 21.7924C25.3069 22.5689 24.6774 23.1984 23.9009 23.1984H13.3562C12.5797 23.1984 11.9502 22.5689 11.9502 21.7924Z"
          fill={fill}
        />
        <path
          d="M11.9502 26.7133C11.9502 25.9368 12.5797 25.3073 13.3562 25.3073H16.1681C16.9446 25.3073 17.5741 25.9368 17.5741 26.7133C17.5741 27.4898 16.9446 28.1192 16.1681 28.1192H13.3562C12.5797 28.1192 11.9502 27.4898 11.9502 26.7133Z"
          fill={fill}
        />
        <path
          d="M57.6589 17.958C57.6589 13.6093 54.9588 11.1299 51.4345 11.1299C47.8906 11.1299 45.21 13.6093 45.21 17.958C45.21 22.2872 47.8906 24.7861 51.4345 24.7861C54.9588 24.7861 57.6589 22.3067 57.6589 17.958ZM54.8096 17.958C54.8096 20.7749 53.4725 22.3002 51.4345 22.3002C49.3899 22.3002 48.0593 20.7749 48.0593 17.958C48.0593 15.1411 49.3899 13.6158 51.4345 13.6158C53.4725 13.6158 54.8096 15.1411 54.8096 17.958Z"
          fill={fill}
        />
        <path
          d="M61.2944 24.6044H64.1048V20.2946H66.4674C69.5245 20.2946 71.3029 18.4708 71.3029 15.8161C71.3029 13.1744 69.5569 11.3116 66.5388 11.3116H61.2944V24.6044ZM64.1048 18.0424V13.6093H66.0001C67.6227 13.6093 68.4081 14.492 68.4081 15.8161C68.4081 17.1337 67.6227 18.0424 66.0131 18.0424H64.1048Z"
          fill={fill}
        />
        <path
          d="M74.682 24.6044H83.665V22.2872H77.4924V19.1133H83.1782V16.7962H77.4924V13.6288H83.639V11.3116H74.682V24.6044Z"
          fill={fill}
        />
        <path
          d="M98.5454 11.3116H95.7479V19.6715H95.6311L89.8934 11.3116H87.427V24.6044H90.2374V16.238H90.3348L96.1179 24.6044H98.5454V11.3116Z"
          fill={fill}
        />
        <path
          d="M107.699 13.6288H111.768V24.6044H114.546V13.6288H118.616V11.3116H107.699V13.6288Z"
          fill={fill}
        />
        <path
          d="M121.967 24.6044H130.95V22.2872H124.778V19.1133H130.463V16.7962H124.778V13.6288H130.924V11.3116H121.967V24.6044Z"
          fill={fill}
        />
        <path
          d="M134.712 24.6044H137.523V19.8922H139.574L142.092 24.6044H145.195L142.371 19.4379C143.884 18.7888 144.721 17.4712 144.721 15.6538C144.721 13.0122 142.975 11.3116 139.957 11.3116H134.712V24.6044ZM137.523 17.6335V13.6093H139.418C141.041 13.6093 141.826 14.3298 141.826 15.6538C141.826 16.9714 141.041 17.6335 139.431 17.6335H137.523Z"
          fill={fill}
        />
        <path
          d="M148.26 11.3116V24.6044H150.987V15.9199H151.097L154.537 24.5395H156.393L159.833 15.9524H159.944V24.6044H162.67V11.3116H159.204L155.543 20.2427H155.387L151.726 11.3116H148.26Z"
          fill={fill}
        />
        <path
          d="M173.75 15.1346H176.443C176.404 12.7655 174.457 11.1299 171.498 11.1299C168.583 11.1299 166.448 12.7396 166.461 15.1541C166.454 17.1142 167.837 18.2371 170.083 18.7758L171.53 19.1393C172.977 19.4898 173.782 19.9052 173.789 20.8009C173.782 21.7745 172.861 22.4365 171.433 22.4365C169.972 22.4365 168.921 21.7615 168.83 20.4309H166.11C166.182 23.3063 168.239 24.7926 171.465 24.7926C174.71 24.7926 176.619 23.2414 176.625 20.8074C176.619 18.5941 174.951 17.4193 172.64 16.9L171.446 16.6144C170.29 16.3483 169.323 15.9199 169.343 14.9658C169.343 14.1091 170.102 13.4795 171.478 13.4795C172.822 13.4795 173.646 14.0896 173.75 15.1346Z"
          fill={fill}
        />
        <path
          d="M188.144 24.6044L189.131 21.5733H193.927L194.914 24.6044H197.926L193.343 11.3116H189.721L185.133 24.6044H188.144ZM189.845 19.3794L191.48 14.3492H191.584L193.22 19.3794H189.845Z"
          fill={fill}
        />
        <path
          d="M201.079 24.6044H203.889V19.8922H205.94L208.459 24.6044H211.561L208.738 19.4379C210.25 18.7888 211.088 17.4712 211.088 15.6538C211.088 13.0122 209.342 11.3116 206.323 11.3116H201.079V24.6044ZM203.889 17.6335V13.6093H205.785C207.407 13.6093 208.193 14.3298 208.193 15.6538C208.193 16.9714 207.407 17.6335 205.798 17.6335H203.889Z"
          fill={fill}
        />
        <path
          d="M226.356 15.9654C225.986 12.8953 223.662 11.1299 220.586 11.1299C217.074 11.1299 214.394 13.6093 214.394 17.958C214.394 22.2937 217.029 24.7861 220.586 24.7861C223.993 24.7861 226.051 22.5209 226.356 20.0739L223.513 20.061C223.247 21.4824 222.13 22.3002 220.631 22.3002C218.612 22.3002 217.243 20.8009 217.243 17.958C217.243 15.193 218.593 13.6158 220.651 13.6158C222.189 13.6158 223.299 14.505 223.513 15.9654H226.356Z"
          fill={fill}
        />
        <path
          d="M229.925 24.6044H232.735V19.1133H238.44V24.6044H241.244V11.3116H238.44V16.7962H232.735V11.3116H229.925V24.6044Z"
          fill={fill}
        />
        <path d="M247.925 11.3116H245.115V24.6044H247.925V11.3116Z" fill={fill} />
        <path
          d="M254.193 11.3116H251.071L255.66 24.6044H259.281L263.864 11.3116H260.748L257.529 21.411H257.406L254.193 11.3116Z"
          fill={fill}
        />
        <path
          d="M267.017 24.6044H276V22.2872H269.828V19.1133H275.514V16.7962H269.828V13.6288H275.974V11.3116H267.017V24.6044Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default Logo;