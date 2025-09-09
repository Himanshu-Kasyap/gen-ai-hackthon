import React, { useState } from 'react';
import styled from 'styled-components';

const DietContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button<{ $isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$isActive ? '#667eea' : 'white'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
  }
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
`;

const FoodCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FoodHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FoodIcon = styled.div`
  font-size: 2rem;
  margin-right: 15px;
`;

const FoodName = styled.h3`
  color: #667eea;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
`;

const FoodDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const NutritionalInfo = styled.div`
  background: rgba(102, 126, 234, 0.05);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
`;

const NutritionalTitle = styled.h4`
  color: #667eea;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const NutritionalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 0.9rem;
`;

const NutritionalItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: #333;
`;

const MentalBenefits = styled.div`
  background: rgba(118, 75, 162, 0.05);
  border-radius: 10px;
  padding: 15px;
`;

const BenefitsTitle = styled.h4`
  color: #764ba2;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const BenefitsList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #333;
  font-size: 0.9rem;
`;

const BenefitItem = styled.li`
  margin-bottom: 5px;
  line-height: 1.4;
`;

interface Food {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    vitamins: string[];
  };
  mentalBenefits: string[];
}

const foods: Food[] = [
  {
    id: '1',
    name: 'Dark Chocolate',
    icon: '🍫',
    category: 'mood-boosting',
    description: 'Rich in antioxidants and compounds that can boost mood and cognitive function.',
    nutrition: {
      calories: 170,
      protein: '2g',
      carbs: '13g',
      fat: '12g',
      fiber: '3g',
      vitamins: ['Magnesium', 'Iron', 'Copper']
    },
    mentalBenefits: [
      'Increases serotonin and endorphin levels',
      'Reduces cortisol (stress hormone)',
      'Improves cognitive function',
      'Enhances mood and reduces anxiety'
    ]
  },
  {
    id: '2',
    name: 'Blueberries',
    icon: '🫐',
    category: 'brain-food',
    description: 'Packed with antioxidants that support brain health and memory.',
    nutrition: {
      calories: 85,
      protein: '1g',
      carbs: '21g',
      fat: '0.5g',
      fiber: '4g',
      vitamins: ['Vitamin C', 'Vitamin K', 'Manganese']
    },
    mentalBenefits: [
      'Improves memory and cognitive function',
      'Reduces age-related cognitive decline',
      'Enhances focus and concentration',
      'Protects against stress-induced damage'
    ]
  },
  {
    id: '3',
    name: 'Salmon',
    icon: '🐟',
    category: 'brain-food',
    description: 'Rich in omega-3 fatty acids essential for brain health.',
    nutrition: {
      calories: 206,
      protein: '22g',
      carbs: '0g',
      fat: '12g',
      fiber: '0g',
      vitamins: ['Omega-3', 'Vitamin D', 'B12']
    },
    mentalBenefits: [
      'Supports neurotransmitter production',
      'Reduces inflammation in the brain',
      'Improves mood and reduces depression',
      'Enhances memory and learning'
    ]
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    icon: '🥛',
    category: 'probiotic',
    description: 'Contains probiotics that support gut-brain connection.',
    nutrition: {
      calories: 130,
      protein: '15g',
      carbs: '6g',
      fat: '5g',
      fiber: '0g',
      vitamins: ['Calcium', 'B12', 'Probiotics']
    },
    mentalBenefits: [
      'Supports gut-brain axis health',
      'Reduces anxiety and stress',
      'Improves mood regulation',
      'Enhances cognitive function'
    ]
  },
  {
    id: '5',
    name: 'Green Tea',
    icon: '🍵',
    category: 'calming',
    description: 'Contains L-theanine which promotes relaxation without drowsiness.',
    nutrition: {
      calories: 2,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g',
      vitamins: ['L-theanine', 'Catechins', 'Caffeine']
    },
    mentalBenefits: [
      'Promotes calm alertness',
      'Reduces stress and anxiety',
      'Improves focus and attention',
      'Supports meditation and mindfulness'
    ]
  },
  {
    id: '6',
    name: 'Avocado',
    icon: '🥑',
    category: 'brain-food',
    description: 'Rich in healthy fats that support brain function and mood.',
    nutrition: {
      calories: 234,
      protein: '3g',
      carbs: '12g',
      fat: '21g',
      fiber: '10g',
      vitamins: ['Folate', 'Vitamin K', 'Potassium']
    },
    mentalBenefits: [
      'Improves blood flow to the brain',
      'Supports neurotransmitter production',
      'Reduces inflammation',
      'Enhances cognitive performance'
    ]
  }
];

const categories = [
  { id: 'all', name: 'All Foods' },
  { id: 'brain-food', name: 'Brain Food' },
  { id: 'mood-boosting', name: 'Mood Boosting' },
  { id: 'calming', name: 'Calming' },
  { id: 'probiotic', name: 'Gut Health' }
];

const Diet: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFoods = activeCategory === 'all' 
    ? foods 
    : foods.filter(food => food.category === activeCategory);

  return (
    <DietContainer>
      <Header>
        <Title>Nutrition for Mental Wellness 🥗</Title>
        <Subtitle>Discover foods that nourish both body and mind</Subtitle>
      </Header>

      <FilterTabs>
        {categories.map(category => (
          <FilterTab
            key={category.id}
            $isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </FilterTab>
        ))}
      </FilterTabs>

      <FoodGrid>
        {filteredFoods.map(food => (
          <FoodCard key={food.id}>
            <FoodHeader>
              <FoodIcon>{food.icon}</FoodIcon>
              <FoodName>{food.name}</FoodName>
            </FoodHeader>
            
            <FoodDescription>{food.description}</FoodDescription>
            
            <NutritionalInfo>
              <NutritionalTitle>Nutritional Information (per serving)</NutritionalTitle>
              <NutritionalGrid>
                <NutritionalItem>
                  <span>Calories:</span>
                  <span>{food.nutrition.calories}</span>
                </NutritionalItem>
                <NutritionalItem>
                  <span>Protein:</span>
                  <span>{food.nutrition.protein}</span>
                </NutritionalItem>
                <NutritionalItem>
                  <span>Carbs:</span>
                  <span>{food.nutrition.carbs}</span>
                </NutritionalItem>
                <NutritionalItem>
                  <span>Fat:</span>
                  <span>{food.nutrition.fat}</span>
                </NutritionalItem>
                <NutritionalItem>
                  <span>Fiber:</span>
                  <span>{food.nutrition.fiber}</span>
                </NutritionalItem>
                <NutritionalItem>
                  <span>Key Nutrients:</span>
                  <span>{food.nutrition.vitamins.join(', ')}</span>
                </NutritionalItem>
              </NutritionalGrid>
            </NutritionalInfo>
            
            <MentalBenefits>
              <BenefitsTitle>Mental Health Benefits</BenefitsTitle>
              <BenefitsList>
                {food.mentalBenefits.map((benefit, index) => (
                  <BenefitItem key={index}>{benefit}</BenefitItem>
                ))}
              </BenefitsList>
            </MentalBenefits>
          </FoodCard>
        ))}
      </FoodGrid>
    </DietContainer>
  );
};

export default Diet;
