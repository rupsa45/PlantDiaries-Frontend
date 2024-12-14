import PlantCard from './PlantCard'
const PlantCardGrid = () => {
    const plantCards = [
      {
        imageSrc: "https://tools-api.webcrumbs.org/image-placeholder/300/160/nature/1",
        title: "Exotic Rainforest Plant",
        location: "Amazon Rainforest",
        description: "A rare and beautiful plant species found deep in the heart of the Amazon, known for its unique adaptation strategies and vibrant coloration.",
        tags: ["Rare Species", "Tropical"],
        postedDate: "2024-01-15"
      },
      {
        imageSrc: "https://tools-api.webcrumbs.org/image-placeholder/300/160/nature/2",
        title: "Desert Succulent",
        location: "Atacama Desert",
        description: "An incredible succulent that survives in one of the world's driest environments, showcasing nature's remarkable resilience and adaptation.",
        tags: ["Drought Resistant", "Survival"],
        postedDate: "2024-02-20"
      },
      {
        imageSrc: "https://tools-api.webcrumbs.org/image-placeholder/300/160/nature/3",
        title: "Alpine Wildflower",
        location: "Himalayan Highlands",
        description: "A delicate yet sturdy wildflower that blooms at extreme altitudes, representing the incredible biodiversity of mountain ecosystems.",
        tags: ["Mountain Flora", "Biodiversity"],
        postedDate: "2024-03-10"
      }
    ];
  
    return (
      <div className="w-full px-4 py-8 bg-[#EAF7EE]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {plantCards.map((card, index) => (
              <PlantCard 
                key={index}
                {...card}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PlantCardGrid;