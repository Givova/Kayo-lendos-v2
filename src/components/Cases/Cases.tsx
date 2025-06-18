import React, { useState } from 'react';
import styled from 'styled-components';
import { CaseItem } from '../../types';

const CasesSection = styled.section`
  padding: 80px 0;
  background-color: var(--gray-color);

  @media (max-width: 768px) {
    padding: 40px 0;
  }
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

  @media (max-width: 768px) {
    margin-bottom: 30px;
    padding: 0 20px;
  }
`;

const CasesTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 10px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--light-color)'};
  color: ${props => props.active ? 'var(--light-color)' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : '#ddd'};
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#f0f0f0'};
  }
`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const CaseCard = styled.div`
  background-color: var(--light-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
    width: 100%;
    height: auto;
    aspect-ratio: 3/4;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CaseImage = styled.div<{ noOverlay?: boolean }>`
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }
  ${CaseCard}:hover & img {
    transform: scale(1.05);
  }
  ${({ noOverlay }) =>
    !noOverlay && `
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%);
      }
    `}
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.3s ease;
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--light-color);
  }
  
  ${CaseCard}:hover & {
    background-color: var(--primary-color);
  }
`;

const CaseInfo = styled.div`
  padding: 20px;
`;

const CaseTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CaseDescription = styled.p`
  font-size: 14px;
  color: var(--dark-gray);
  line-height: 1.5;
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    display: block;
    border-radius: 4px;
  }
  
  iframe {
    max-width: 100%;
    width: 800px;
    height: 450px;
    border: none;
    border-radius: 4px;
    
    @media (max-width: 992px) {
      height: 400px;
    }
    
    @media (max-width: 768px) {
      height: 350px;
    }
    
    @media (max-width: 576px) {
      height: 250px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: var(--light-color);
  font-size: 30px;
  cursor: pointer;
  z-index: 1001;
`;

const verticalVideos: CaseItem[] = [
  {
    id: 'v1',
    title: 'Kayo Ninja H2R',
    description: 'Обзор легендарного Kayo Ninja H2R',
    image: '/images/V1.mp4',
    type: 'video'
  },
  {
    id: 'v2',
    title: 'Kayo Versys 1000',
    description: 'Тест-драйв Kayo Versys 1000',
    image: '/images/video2.mp4',
    type: 'video'
  },
  {
    id: 'v3',
    title: 'Kayo Z900',
    description: 'Обзор Kayo Z900',
    image: '/images/video3.mp4',
    type: 'video'
  }
];

const AutoPlayVideo: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={videoRef}
      src={src}
      width="100%"
      height="100%"
      controls
      muted
      playsInline
      preload="auto"
      loop
      style={{ objectFit: 'cover', borderRadius: 8 }}
    />
  );
};

const Cases: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  const openModal = (caseItem: CaseItem) => {
    setSelectedCase(caseItem);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <CasesSection id="cases">
      <div className="container">
        <SectionTitle>Наши <span>видео</span></SectionTitle>
        <SectionSubtitle>
          Посмотрите видео наших мотоциклов в действии
        </SectionSubtitle>

        <CasesGrid>
          {verticalVideos.map((caseItem) => (
            <CaseCard 
              key={caseItem.id} 
              onClick={() => openModal(caseItem)}
            >
              <CaseImage noOverlay>
                <AutoPlayVideo src={caseItem.image} />
              </CaseImage>
            </CaseCard>
          ))}
        </CasesGrid>

        <Modal isOpen={modalOpen} onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            {selectedCase && (
              <video
                src={selectedCase.image}
                controls
                autoPlay
                loop
                style={{ maxWidth: '100%', maxHeight: '90vh' }}
              />
            )}
          </ModalContent>
        </Modal>
      </div>
    </CasesSection>
  );
};

export default Cases; 