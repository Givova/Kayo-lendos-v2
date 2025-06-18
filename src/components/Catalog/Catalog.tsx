import React, { useState } from 'react';
import styled from 'styled-components';
import { ProductModel } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const CatalogSection = styled.section`
  padding: 40px 0;
  background-color: var(--gray-color);
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  
  span {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  text-align: center;
  color: var(--dark-gray);
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background-color: var(--light-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  /* position: relative; */ /* Удалено, так как не требуется */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .swiper {
    width: 100%;
    height: 200px;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    outline: none !important;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .swiper-slide-active {
    outline: none !important;
    -webkit-tap-highlight-color: transparent;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: var(--primary-color);
    background: rgba(255, 255, 255, 0.8);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    
    &:after {
      font-size: 16px;
    }
  }

  img {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
  }

  .swiper-pagination-bullet {
    background: var(--primary-color);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  /* padding: 20px; */ /* Удалено */
`;

const ProductName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 0 20px; /* Добавлено */
`;

const ProductDescription = styled.p`
  color: var(--dark-gray);
  margin-bottom: 15px;
  line-height: 1.5;
  padding: 0 20px; /* Добавлено */
`;

const ProductPrice = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 15px;
  padding: 0 20px; /* Добавлено */
`;

/* Контейнер таблицы */
const ProductSpecsContainer = styled.div`
  margin-top: 20px; /* Увеличенный отступ сверху */
  margin-bottom: 20px; /* Увеличенный отступ снизу */
  background-color: #f9fafb; /* bg-gray-50 */
  /* Для тёмной темы: */
  /* background-color: #0f172a; */
  // margin-left: -20px; /* Компенсация padding ProductInfo для растягивания на всю ширину */
  // margin-right: -20px; /* Компенсация padding ProductInfo для растягивания на всю ширину */
  width: calc(100% + 40px); /* Занимаем всю доступную ширину */
  /* Удалены position, left, right, top, box-sizing, outline */
`;

/* Сама таблица */
const FeaturesTable = styled.table`
  border-collapse: collapse; /* border-collapse */
  width: 100%; /* w-full */
  margin-bottom: 2px; /* mb-[2px] */
  caption-side: bottom; /* caption-bottom */
  font-size: 0.875rem; /* text-sm */
`;

/* Строки таблицы */
const FeaturesTr = styled.tr`
  border-width: 0; /* border-0 */
`;

/* Текст внутри ячеек */
const TdContent = styled.div`
  white-space: nowrap; /* whitespace-nowrap */
  overflow: hidden; /* overflow-hidden */
  text-overflow: ellipsis; /* overflow-ellipsis */
  text-align: left; /* text-justify -> text-left для соответствия фото */
  /* opacity: 0.5; */ /* Удалено, так как текст на фото не бледный */
  max-width: 150px; /* max-w-[150px] */
`;

/* Ячейки таблицы */
const FeaturesTd = styled.td<{ isLeftColumn?: boolean }>`
  padding: 0.5rem 1rem; /* p-2 ps-4 pe-4 */
  border: 1px solid #e5e7eb; /* border (значение цвета border-gray-200) */
  width: 50%; /* w-1/2 */
  vertical-align: middle; /* align-middle */
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); /* Изменено для плавности всех эффектов */
  position: relative; /* Добавлено для работы z-index */

  /* Единые стили для всех ячеек */
  font-weight: 500; /* Единый шрифт */
  color: #222; /* Единый цвет текста */
  background-color: #f7fafd; /* Единый цвет фона */

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* hover:shadow-md */
    z-index: 10; /* Добавлено, чтобы тень была видна */
    transform: scale(1.03); /* Добавлено для эффекта увеличения */
    background-color: #e2e8f0; /* Чуть более темный фон при наведении */
  }
`;

const MoreInfoButton = styled.a`
  display: inline-block;
  background-color: #196dff;
  color: var(--light-color);
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin: 15px 20px 20px; /* Изменены отступы: 15px сверху, 20px по бокам, 20px снизу */
  
  &:hover {
    background-color: #2563eb;
  }
`;

const CatalogButtonWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const CatalogButton = styled.a`
  display: inline-flex;
  background-color: #196dff; 
  color: var(--light-color);
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 500;
  border: none; 
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2563eb; 
    color: var(--light-color); 
    transform: translateY(-2px);
  }
`;

const SwiperSliderWrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 16px 12px 12px 12px;
  margin: 0 auto 12px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  max-width: 95%;
`;

const CatalogImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 60%, #e0f7fa 100%);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  min-height: 160px;
  max-width: 95%;
  margin: 0 auto 18px auto;
  overflow: hidden;
  @media (max-width: 600px) {
    min-height: 120px;
  }
`;

const CatalogImage = ({ src, alt }: { src: string; alt: string }) => (
  <CatalogImageWrapper>
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 120,
      height: 120,
      background: 'radial-gradient(circle, #e0f7fa 0%, #fff 80%)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.35,
      zIndex: 1,
      filter: 'blur(2px)'
    }} />
    <img
      src={src}
      alt={alt}
      style={{
        position: 'relative',
        zIndex: 2,
        width: '80%',
        maxWidth: 220,
        height: 120,
        objectFit: 'contain',
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto',
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
      }}
    />
  </CatalogImageWrapper>
);

const productsData: ProductModel[] = [
  {
    id: '1',
    name: 'Kayo K1-L 150 MX 19-16',
    
    price: '144 990 ₽',
    features: [
      '144.6 см³', '12 л.с.',
      '1 цилиндра', '100 кг',
      '4 такта', '5-ступенчатая'
    ],
    image: '/images/k1-l 150/1.jpg',
    images: [
      '/images/k1-l 150/1.jpg',
      '/images/k1-l 150/2.jpg',
      '/images/k1-l 150/3.jpg',
      '/images/k1-l 150/4.jpg',
      '/images/k1-l 150/5.jpg',
      '/images/k1-l 150/6.jpg',
      
    ]
  },
  {
    id: '2',
    name: 'Kayo BASIC K125EM 17-14 KRZ',
    price: '104 990 ₽',
    features: [
      '125 см³',
      '9 л.с.',
      '1 цилиндра',
      '4 такта',
      '4-ступенчатая 1-N-2-3-4',
      '72 кг'
    ],
    image: '/images/basic k125/1.jpg',
    images: [
      '/images/basic k125/1.jpg',
      '/images/basic k125/2.jpg',
      '/images/basic k125/3.jpg',
      '/images/basic k125/4.jpg'
    ]
  },
  {
    id: '3',
    name: 'Kayo EVOLUTION K125EM 17-14 KR',
    price: '113 990 ₽',
    features: [
      '125 см³',
      '9 л.с.',
      '1 цилиндра',
      '4 такта',
      '4-ступенчатая 1-N-2-3-4',
      '78 кг'
    ],
    image: '/images/evolution K125/1.jpg',
    images: [
      '/images/evolution K125/1.jpg',
      '/images/evolution K125/2.jpg',
      '/images/evolution K125/3.jpg',
      '/images/evolution K125/4.jpg'
    ]
  },
  {
    id: '4',
    name: 'Kayo K6-R KYB 250 FCR 21/18',
    price: '500 000 ₽',
    features: [
      '250 см³', '36 л.с.',
      '1 цилиндра', '4 такта',
      '6-ступенчатая 1-N-2-3-4-5-6', '114 кг'
    ],
    image: 'images/K6-R/1.jpg',
    images: [
      'images/K6-R/1.jpg',
      'images/K6-R/2.jpg',
      'images/K6-R/3.jpg',
      'images/K6-R/4.jpg',
      'images/K6-R/5.jpg'
    ],
  },
  {
    id: '5',
    name: 'Kayo T4 300 ENDURO PR 21/18',
    price: '259 990 ₽',
    features: [
      '300 см³',
      '24 л.с.',
      '1 цилиндра', '4 такта',
      '5-ступенчатая 1-N-2-3-4-5',
      '112 кг'
    ],
    image: '/images/T4 300 enduro/1.jpg',
    images: [
      '/images/T4 300 enduro/1.jpg',
      '/images/T4 300 enduro/2.jpg',
      '/images/T4 300 enduro/3.jpg',
      '/images/T4 300 enduro/4.jpg',
      '/images/T4 300 enduro/5.jpg'
    ]
  },
  {
    id: '6',
    name: 'Kayo KT50L 2T 14-12',
    price: '94 990 ₽',
    features: [
      '107 см³',
      '7.5 л.с.',
      '1 цилиндра', '4 такта',
      'Автоматическая',
      '65 кг'
    ],
    image: '/images/KT50L/1.jpg',
    images: [
      '/images/KT50L/1.jpg',
      '/images/KT50L/2.jpg',
      '/images/KT50L/3.jpg',
      '/images/KT50L/4.jpg',
    ]
  }
];

const Catalog: React.FC = () => {
  return (
    <CatalogSection id="catalog">
      <div className="container">
        <SectionTitle>Каталог <span>мотоциклов Kayo</span></SectionTitle>
        <SectionSubtitle>
          В нашем каталоге представлены легендарные мотоциклы Kayo для любых целей и стилей езды
        </SectionSubtitle>
        <CatalogGrid>
          {productsData.map((product) => (
            <ProductCard key={product.id}>
              {product.images && product.images.length > 0 ? (
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  loop={true}
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`${product.name} - фото ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '10px',
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'contain',
                    padding: '10px',
                  }}
                />
              )}
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductSpecsContainer>
                  <FeaturesTable>
                    <tbody>
                      {[0, 2, 4].map(row => (
                        <FeaturesTr key={row}>
                          <FeaturesTd isLeftColumn={true}>
                            <TdContent>{product.features[row] || ''}</TdContent>
                          </FeaturesTd>
                          <FeaturesTd isLeftColumn={false}>
                            <TdContent>{product.features[row + 1] || ''}</TdContent>
                          </FeaturesTd>
                        </FeaturesTr>
                      ))}
                    </tbody>
                  </FeaturesTable>
                </ProductSpecsContainer>
                <ProductPrice>{product.price}</ProductPrice>
                <MoreInfoButton href={`https://wa.me/79203383324?text=Здравствуйте,%20хочу%20узнать%20больше%20о%20мотоцикле%20${encodeURIComponent(product.name)}`}>Узнать больше</MoreInfoButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </CatalogGrid>
        <CatalogButtonWrapper>
          <CatalogButton href="https://wa.me/79203383324?text=Здравствуйте,%20интересует%20каталог%20мотоциклов%20Kayo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.4054 3.5875C18.1607 1.3425 15.1714 0.0525 11.9946 0.0525C5.4375 0.0525 0.0964286 5.3925 0.0964286 12C0.0964286 14.1 0.6375 16.1475 1.6607 17.9475L0 24L6.2089 22.3725C7.94464 23.3025 9.95357 23.7975 11.9946 23.7975C18.5518 23.7975 24 18.4575 24 11.85C24 8.6325 22.65 5.8325 20.4054 3.5875ZM11.9946 21.7875C10.2214 21.7875 8.4482 21.315 6.9375 20.4675L6.58393 20.2575L2.85 21.195L3.80893 17.565L3.57321 17.1975C2.63036 15.63 2.11607 13.8525 2.11607 12C2.11607 6.4575 6.50357 2.0625 12 2.0625C14.6571 2.0625 17.1536 3.12 19.0286 5.01C20.9036 6.9 21.9804 9.3975 21.9804 11.85C21.9804 17.3925 17.4857 21.7875 11.9946 21.7875ZM17.4321 14.5275C17.1429 14.3775 15.675 13.6575 15.4286 13.5825C15.1714 13.5 15 13.4625 14.7857 13.755C14.5714 14.0475 14.0036 14.7 13.8321 14.9175C13.6607 15.1275 13.4893 15.15 13.2 15C11.3786 14.0925 10.1893 13.3875 8.99464 11.34C8.67321 10.8 9.3 10.8375 9.88393 9.69C9.96429 9.4725 9.92678 9.2925 9.87321 9.1425C9.81964 8.9925 9.18214 7.53 8.93036 6.9375C8.67857 6.3675 8.42679 6.45 8.25536 6.45C8.08393 6.45 7.875 6.4125 7.66071 6.4125C7.44643 6.4125 7.1143 6.4725 6.85714 6.7575C6.6 7.0425 5.84464 7.7625 5.84464 9.225C5.84464 10.6875 6.89464 12.1125 7.03393 12.33C7.18929 12.54 9.16071 15.555 12.1607 16.8375C14.1214 17.6925 14.9143 17.7675 15.9 17.625C16.4893 17.5425 17.6893 16.9125 17.9411 16.2075C18.1929 15.5025 18.1929 14.91 18.1393 14.8125C18.0857 14.7075 17.8714 14.6475 17.5821 14.4975L17.4321 14.5275Z" />
            </svg>
            Запросить каталог в WhatsApp
          </CatalogButton>
        </CatalogButtonWrapper>
      </div>
    </CatalogSection>
  );
};

export default Catalog; 