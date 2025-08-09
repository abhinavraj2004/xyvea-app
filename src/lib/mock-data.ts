import type { CausalNode, CausalEdge, ProPlanFeature, Contributor } from '@/lib/types';

export const mockNodes: CausalNode[] = [
  // Existing Climate Change & Bermuda Triangle Data
  { id: '1', slug: 'increased-co2-levels', title: 'Increased CO2 Levels', summary: 'Rising concentrations of carbon dioxide in the Earth\'s atmosphere, primarily from human activities such as burning fossil fuels.', tags: ['Climate', 'Environment'], causesCount: 2, effectsCount: 2 },
  { id: '2', slug: 'deforestation', title: 'Deforestation', summary: 'The clearing of forests for other land uses, such as agriculture or urban development, reducing the Earth\'s capacity to absorb CO2.', tags: ['Environment', 'Land Use'], causesCount: 1, effectsCount: 2 },
  { id: '3', slug: 'global-temperature-rise', title: 'Global Temperature Rise', summary: 'The long-term heating of Earth’s climate system observed since the pre-industrial period due to human activities.', tags: ['Climate', 'Global Warming'], causesCount: 1, effectsCount: 1 },
  { id: '4', slug: 'ocean-acidification', title: 'Ocean Acidification', summary: 'The ongoing decrease in the pH of the Earth\'s oceans, caused by the uptake of carbon dioxide from the atmosphere.', tags: ['Oceanography', 'Climate'], causesCount: 1, effectsCount: 1 },
  { id: '5', slug: 'loss-of-biodiversity', title: 'Loss of Biodiversity', summary: 'The decline in the number, genetic variability, and variety of species, and the biological communities in a given area.', tags: ['Ecology', 'Environment'], causesCount: 3, effectsCount: 0 },
  { id: '6', slug: 'fossil-fuel-combustion', title: 'Fossil Fuel Combustion', summary: 'The burning of coal, oil, and natural gas, which is the primary source of anthropogenic CO2 emissions.', tags: ['Energy', 'Industry'], causesCount: 0, effectsCount: 1 },
  { id: '7', slug: 'bermuda-triangle', title: 'Bermuda Triangle', summary: 'A region in the western part of the North Atlantic Ocean where a number of aircraft and ships are said to have disappeared under mysterious circumstances.', tags: ['Mystery', 'Geography'], causesCount: 2, effectsCount: 1 },
  { id: '8', slug: 'unexplained-disappearances', title: 'Unexplained Disappearances', summary: 'The vanishing of vessels and aircraft in the Bermuda Triangle region, which has led to widespread speculation and numerous theories.', tags: ['Mystery', 'Events'], causesCount: 1, effectsCount: 0 },
  { id: '9', slug: 'extreme-weather-phenomena', title: 'Extreme Weather Phenomena', summary: 'Unusually severe or unseasonal weather, such as tropical cyclones and rogue waves, that are common in the region.', tags: ['Meteorology', 'Oceanography'], causesCount: 0, effectsCount: 1 },
  { id: '10', slug: 'magnetic-field-anomalies', title: 'Magnetic Field Anomalies', summary: 'Variations in the Earth\'s magnetic field that can cause compasses to point to true north instead of magnetic north, potentially causing navigational confusion.', tags: ['Geophysics', 'Navigation'], causesCount: 0, effectsCount: 1 },

  // New Social Media Impact Data
  { id: '11', slug: 'social-media-usage', title: 'Social Media Usage', summary: 'The widespread use of social media platforms for communication, content sharing, and networking.', tags: ['Technology', 'Society', 'Communication'], causesCount: 1, effectsCount: 5 },
  { id: '12', slug: 'mental-health-decline', title: 'Decline in Youth Mental Health', summary: 'A documented decrease in the psychological well-being of adolescents and young adults, including rising rates of anxiety and depression.', tags: ['Health', 'Psychology', 'Youth'], causesCount: 2, effectsCount: 0 },
  { id: '13', slug: 'political-polarization', title: 'Political Polarization', summary: 'The divergence of political attitudes towards ideological extremes.', tags: ['Politics', 'Society'], causesCount: 1, effectsCount: 1 },
  { id: '14', slug: 'spread-of-misinformation', title: 'Spread of Misinformation', summary: 'The rapid and wide dissemination of false or inaccurate information, particularly through online social networks.', tags: ['Information', 'Society', 'Media'], causesCount: 1, effectsCount: 2 },
  { id: '15', slug: 'algorithmic-content-curation', title: 'Algorithmic Content Curation', summary: 'The use of algorithms by platforms to select and rank content for users, often creating personalized "filter bubbles" or "echo chambers".', tags: ['Technology', 'AI', 'Media'], causesCount: 1, effectsCount: 2 },
  { id: '16', slug: 'decreased-trust-in-institutions', title: 'Decreased Trust in Institutions', summary: 'A general decline in public confidence in traditional institutions like government, media, and science.', tags: ['Society', 'Politics'], causesCount: 1, effectsCount: 0 },
  { id: '17', slug: 'rise-of-influencer-culture', title: 'Rise of Influencer Culture', summary: 'The emergence of social media personalities who have a significant impact on their followers\' purchasing decisions and lifestyle choices.', tags: ['Culture', 'Economics', 'Media'], causesCount: 1, effectsCount: 1 },
  { id: '18', slug: 'smartphone-adoption', title: 'High Smartphone Adoption', summary: 'The near-ubiquitous ownership and use of smartphones, providing constant access to the internet and social media.', tags: ['Technology'], causesCount: 0, effectsCount: 1 },
  { id: '19', slug: 'social-comparison', title: 'Increased Social Comparison', summary: 'The tendency for individuals to compare their own lives, achievements, and appearances to curated, often idealized, portrayals on social media.', tags: ['Psychology', 'Social Dynamics'], causesCount: 1, effectsCount: 1 },
  { id: '20', slug: 'cyberbullying', title: 'Cyberbullying', summary: 'The use of electronic communication to bully a person, typically by sending messages of an intimidating or threatening nature.', tags: ['Health', 'Social Dynamics', 'Youth'], causesCount: 1, effectsCount: 1 },
  { id: '21', slug: 'changes-in-consumer-behavior', title: 'Changes in Consumer Behavior', summary: 'A shift in how consumers discover, evaluate, and purchase goods and services, heavily influenced by online trends and recommendations.', tags: ['Economics', 'Business'], causesCount: 1, effectsCount: 0 },
];

export const mockEdges: CausalEdge[] = [
  // Existing Edges
  { id: 'e1', cause: mockNodes.find(n => n.id === '6')!, effect: mockNodes.find(n => n.id === '1')!, status: 'verified', summary: 'The combustion of fossil fuels releases large amounts of CO2 into the atmosphere.', confidence: 9, stance: 'support', upvotes: 128, downvotes: 3, key_quotes: [{text: 'Fossil fuels account for over 80% of global primary energy consumption.', cite: 'IEA Report 2023'}] },
  { id: 'e2', cause: mockNodes.find(n => n.id === '2')!, effect: mockNodes.find(n => n.id === '1')!, status: 'verified', summary: 'Forests act as carbon sinks; their removal reduces the absorption of atmospheric CO2.', confidence: 8, stance: 'support', upvotes: 97, downvotes: 5, key_quotes: [{text: 'Tropical deforestation is responsible for about 10% of gross global carbon emissions.', cite: 'Nature Climate Change'}] },
  { id: 'e3', cause: mockNodes.find(n => n.id === '1')!, effect: mockNodes.find(n => n.id === '3')!, status: 'verified', summary: 'CO2 is a greenhouse gas that traps heat in the atmosphere, leading to a rise in global temperatures.', confidence: 10, stance: 'support', upvotes: 210, downvotes: 2, key_quotes: [{text: 'The concentration of CO2 in our atmosphere, as of 2023, is the highest it has been in human history.', cite: 'NOAA'}] },
  { id: 'e4', cause: mockNodes.find(n => n.id === '1')!, effect: mockNodes.find(n => n.id === '4')!, status: 'verified', summary: 'About a quarter of the CO2 released by human activities is absorbed by the oceans, increasing their acidity.', confidence: 9, stance: 'support', upvotes: 150, downvotes: 1 },
  { id: 'e5', cause: mockNodes.find(n => n.id === '3')!, effect: mockNodes.find(n => n.id === '5')!, status: 'verified', summary: 'Rapid changes in climate can exceed the adaptive capacity of many species, leading to population declines and extinction.', confidence: 8, stance: 'support', upvotes: 112, downvotes: 8 },
  { id: 'e6', cause: mockNodes.find(n => n.id === '2')!, effect: mockNodes.find(n => n.id === '5')!, status: 'verified', summary: 'Habitat destruction from deforestation is a primary driver of biodiversity loss worldwide.', confidence: 9, stance: 'support', upvotes: 180, downvotes: 4 },
  { id: 'e7', cause: mockNodes.find(n => n.id === '4')!, effect: mockNodes.find(n => n.id === '5')!, status: 'pending', summary: 'Ocean acidification harms marine organisms like corals and shellfish, disrupting marine ecosystems.', confidence: 7, stance: 'support', upvotes: 45, downvotes: 2 },
  { id: 'e8', cause: mockNodes.find(n => n.id === '7')!, effect: mockNodes.find(n => n.id === '8')!, status: 'disputed', summary: 'The region is associated with a high number of allegedly mysterious disappearances of ships and planes.', confidence: 4, stance: 'inconclusive', upvotes: 88, downvotes: 50 },
  { id: 'e9', cause: mockNodes.find(n => n.id === '9')!, effect: mockNodes.find(n => n.id === '7')!, status: 'verified', summary: 'The Gulf Stream can cause rapid, violent changes in weather, and the area sees a high number of hurricanes.', confidence: 8, stance: 'support', upvotes: 76, downvotes: 2 },
  { id: 'e10', cause: mockNodes.find(n => n.id === '10')!, effect: mockNodes.find(n => n.id === '7')!, status: 'pending', summary: 'Navigational problems due to magnetic anomalies are a proposed explanation for the disappearances.', confidence: 6, stance: 'support', upvotes: 61, downvotes: 15 },
  
  // New Edges for Social Media Graph
  { id: 'e11', cause: mockNodes.find(n => n.id === '18')!, effect: mockNodes.find(n => n.id === '11')!, status: 'verified', summary: 'The accessibility and portability of smartphones are primary drivers for the growth of social media usage.', confidence: 9, stance: 'support', upvotes: 300, downvotes: 10, key_quotes: [{text: 'Mobile devices accounted for 70% of total time spent on social media in 2023.', cite: 'DataReportal'}] },
  { id: 'e12', cause: mockNodes.find(n => n.id === '11')!, effect: mockNodes.find(n => n.id === '19')!, status: 'verified', summary: 'Social media platforms facilitate constant exposure to others\' lives, increasing social comparison.', confidence: 8, stance: 'support', upvotes: 150, downvotes: 5 },
  { id: 'e13', cause: mockNodes.find(n => n.id === '19')!, effect: mockNodes.find(n => n.id === '12')!, status: 'pending', summary: 'Upward social comparison is correlated with increased feelings of depression and anxiety among users.', confidence: 7, stance: 'support', upvotes: 120, downvotes: 15, key_quotes: [{ text: 'A meta-analysis found a significant positive relationship between social comparison on social networking sites and depressive symptoms.', cite: 'Journal of Affective Disorders' }] },
  { id: 'e14', cause: mockNodes.find(n => n.id === '11')!, effect: mockNodes.find(n => n.id === '20')!, status: 'verified', summary: 'Anonymity and distance on social platforms can facilitate bullying behaviors.', confidence: 9, stance: 'support', upvotes: 180, downvotes: 3 },
  { id: 'e15', cause: mockNodes.find(n => n.id === '20')!, effect: mockNodes.find(n => n.id === '12')!, status: 'verified', summary: 'Victims of cyberbullying report higher levels of stress, anxiety, and depression.', confidence: 9, stance: 'support', upvotes: 200, downvotes: 2 },
  { id: 'e16', cause: mockNodes.find(n => n.id === '11')!, effect: mockNodes.find(n => n.id === '15')!, status: 'verified', summary: 'Social media platforms use algorithms to personalize content feeds and maximize user engagement.', confidence: 10, stance: 'support', upvotes: 250, downvotes: 1 },
  { id: 'e17', cause: mockNodes.find(n => n.id === '15')!, effect: mockNodes.find(n => n.id === '13')!, status: 'pending', summary: 'Algorithmic echo chambers can reinforce existing beliefs and limit exposure to diverse perspectives, increasing polarization.', confidence: 7, stance: 'support', upvotes: 190, downvotes: 25 },
  { id: 'e18', cause: mockNodes.find(n => n.id === '15')!, effect: mockNodes.find(n => n.id === '14')!, status: 'verified', summary: 'Algorithms designed to maximize engagement can inadvertently promote sensational and false content.', confidence: 8, stance: 'support', upvotes: 220, downvotes: 12 },
  { id: 'e19', cause: mockNodes.find(n => n.id === '11')!, effect: mockNodes.find(n => n.id === '14')!, status: 'verified', summary: 'The architecture of social media allows for the rapid, frictionless spread of information, regardless of its accuracy.', confidence: 9, stance: 'support', upvotes: 210, downvotes: 8 },
  { id: 'e20', cause: mockNodes.find(n => n.id === '14')!, effect: mockNodes.find(n => n.id === '16')!, status: 'pending', summary: 'The proliferation of misinformation erodes trust in traditional sources of authority like media and government.', confidence: 7, stance: 'support', upvotes: 160, downvotes: 20 },
  { id: 'e21', cause: mockNodes.find(n => n.id === '13')!, effect: mockNodes.find(n => n.id === '16')!, status: 'disputed', summary: 'As political sides drift apart, they lose faith in institutions seen as aligned with the opposition.', confidence: 6, stance: 'support', upvotes: 110, downvotes: 30 },
  { id: 'e22', cause: mockNodes.find(n => n.id === '11')!, effect: mockNodes.find(n => n.id === '17')!, status: 'verified', summary: 'Social media platforms have enabled individuals to build large followings, creating a new class of "influencers".', confidence: 9, stance: 'support', upvotes: 170, downvotes: 5 },
  { id: 'e23', cause: mockNodes.find(n => n.id === '17')!, effect: mockNodes.find(n => n.id === '21')!, status: 'verified', summary: 'Influencer marketing and user-generated content are now key drivers of consumer trends and purchasing decisions.', confidence: 8, stance: 'support', upvotes: 140, downvotes: 6 },
];

export const proPlanFeatures: ProPlanFeature[] = [
  { name: 'Daily Search Quota', free: '5 searches', pro: '200 searches' },
  { name: 'Public Graph Access', free: true, pro: true },
  { name: 'Propose Links', free: true, pro: true },
  { name: 'Vote on Links', free: true, pro: true },
  { name: 'Private Graphs', free: false, pro: true },
  { name: 'Team Collaboration', free: false, pro: 'Coming Soon' },
  { name: 'Priority Support', free: false, pro: true },
];

const generateContributors = (count: number, contributionsStart: number, contributionStep: number): Contributor[] => {
    const names = ['Alex Doe', 'Ben Smith', 'Chloe Brown', 'David Garcia', 'Emily White', 'Frank Miller', 'Grace Lee', 'Henry Wilson', 'Isabella Jones', 'Jack Taylor', 'Katherine Chen', 'Liam Rodriguez'];
    const contributors: Contributor[] = [];
    const proUsers = [1, 4, 5, 8];
    for (let i = 0; i < count; i++) {
        contributors.push({
            id: `user-${i+1}`,
            rank: i + 1,
            name: names[i % names.length],
            avatar: `https://placehold.co/100x100.png?text=${names[i % names.length].charAt(0)}`,
            contributions: Math.floor(contributionsStart - i * contributionStep),
            plan: proUsers.includes(i + 1) ? 'pro' : 'free'
        })
    }
    return contributors;
}

export const mockContributors = {
    allTime: generateContributors(10, 1532, 120),
    year: generateContributors(10, 891, 80),
    month: generateContributors(10, 213, 15),
    day: generateContributors(10, 25, 2),
}
