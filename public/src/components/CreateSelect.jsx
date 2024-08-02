import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import CreateCharacterFields from '../models/CharacterAttributes';
import axios from 'axios';

const getOptions = (field_id = 7) => {
    //axios.get("/getCharacterAtttributeValues/"+field_id, );       
    const familyBackgroundField = {
        aid: 9,
        an: "family background",
        ad: "The character's family history, relationships, and dynamics.",
        ac: "background",
        ae: "Shapes the character's upbringing, values, and interpersonal relationships.",
        av: [
        {
            vn: "Single parent household",
            vp: 0.1,
            ve: "Raised by one parent, typically results in close bond with that parent"
        },
        {
            vn: "Single father household",
            vp: 0.03,
            ve: "Raised by a single father, typically results in close bond with father"
        },
        {
            vn: "Single mother household",
            vp: 0.05,
            ve: "Raised by a single mother, typically results in close bond with mother"
        },
        {
            vn: "Traditional nuclear family",
            vp: 0.15,
            ve: "Raised by both parents, typically results in balanced upbringing"
        },
        {
            vn: "Blended family",
            vp: 0.05,
            ve: "Family includes step-parents and step-siblings, often leads to complex family dynamics"
        },
        {
            vn: "Divorced parents",
            vp: 0.1,
            ve: "Raised by divorced parents, can result in divided loyalties and adaptive skills"
        },
        {
            vn: "Extended family household",
            vp: 0.05,
            ve: "Raised with grandparents or other relatives, often leads to strong family ties"
        },
        {
            vn: "Raised by grandparents",
            vp: 0.04,
            ve: "Raised primarily by grandparents, often leads to respect for elders"
        },
        {
            vn: "Orphaned and adopted",
            vp: 0.03,
            ve: "Adopted after being orphaned, can result in unique family dynamics"
        },
        {
            vn: "Foster care system",
            vp: 0.03,
            ve: "Raised in foster care, often leads to resilience and adaptability"
        },
        {
            vn: "Only child",
            vp: 0.1,
            ve: "No siblings, often results in strong independence or reliance on parents"
        },
        {
            vn: "Multiple siblings",
            vp: 0.15,
            ve: "Raised with several siblings, typically leads to strong social and competitive skills"
        },
        {
            vn: "Family business",
            vp: 0.05,
            ve: "Family owns a business, often leads to entrepreneurial skills and responsibilities"
        },
        {
            vn: "Raised by older sibling",
            vp: 0.02,
            ve: "Older sibling took on parental role, often leads to unique sibling bond"
        },
        {
            vn: "Parents in high-profile careers",
            vp: 0.03,
            ve: "Parents have high-profile jobs, can lead to public scrutiny and high expectations"
        },
        {
            vn: "Military family",
            vp: 0.05,
            ve: "Parents served in the military, often leads to discipline and frequent relocations"
        },
        {
            vn: "Wealthy family",
            vp: 0.05,
            ve: "Raised in wealth, can lead to privileged upbringing and different societal perspectives"
        },
        {
            vn: "Low-income family",
            vp: 0.1,
            ve: "Raised in a low-income environment, often leads to resilience and resourcefulness"
        },
        {
            vn: "Religious family",
            vp: 0.05,
            ve: "Raised in a religious environment, often leads to strong faith-based values"
        },
        {
            vn: "International family",
            vp: 0.03,
            ve: "Family from different countries, often leads to multicultural upbringing"
        },
        {
            vn: "Parents in blue-collar jobs",
            vp: 0.05,
            ve: "Parents work in blue-collar jobs, often leads to a strong work ethic and practical skills"
        },
        {
            vn: "Rural upbringing",
            vp: 0.05,
            ve: "Raised in a rural area, often leads to appreciation for nature and self-sufficiency"
        },
        {
            vn: "Urban upbringing",
            vp: 0.1,
            ve: "Raised in an urban area, often leads to street smarts and diverse social skills"
        },
        {
            vn: "Suburban upbringing",
            vp: 0.1,
            ve: "Raised in a suburban area, often leads to a balanced and secure environment"
        },
        {
            vn: "Parents in law enforcement",
            vp: 0.02,
            ve: "Parents are in law enforcement, often leads to respect for rules and order"
        },
        {
            vn: "Parents in education",
            vp: 0.03,
            ve: "Parents are educators, often leads to a strong value on learning and curiosity"
        },
        {
            vn: "Parents in healthcare",
            vp: 0.03,
            ve: "Parents are healthcare professionals, often leads to compassion and health awareness"
        },
        {
            vn: "Scientist parents",
            vp: 0.02,
            ve: "Parents are scientists, often leads to intellectual curiosity and analytical skills"
        },
        {
            vn: "Artist parents",
            vp: 0.02,
            ve: "Parents are artists, often leads to creativity and appreciation for the arts"
        },
        {
            vn: "Political family",
            vp: 0.02,
            ve: "Family involved in politics, often leads to strong opinions and leadership skills"
        },
        {
            vn: "Academic family",
            vp: 0.03,
            ve: "Family values education, often leads to high academic achievement"
        },
        {
            vn: "Sports-oriented family",
            vp: 0.03,
            ve: "Family heavily involved in sports, often leads to athletic skills and competitive nature"
        },
        {
            vn: "Parents who travel frequently",
            vp: 0.03,
            ve: "Parents travel often, leads to exposure to different cultures and adaptability"
        },
        {
            vn: "Family with a strong cultural identity",
            vp: 0.03,
            ve: "Family has a strong cultural identity, often leads to pride in heritage and cultural values"
        },
        {
            vn: "Immigrant family",
            vp: 0.04,
            ve: "Family immigrated to a new country, often leads to resilience and multicultural awareness"
        },
        {
            vn: "Parents who are entrepreneurs",
            vp: 0.03,
            ve: "Parents are entrepreneurs, often leads to a strong work ethic and business skills"
        },
        {
            vn: "LGBTQ+ family",
            vp: 0.02,
            ve: "Raised in an LGBTQ+ household, often leads to openness and acceptance of diversity"
        },
        {
            vn: "Parents involved in farming or agriculture",
            vp: 0.02,
            ve: "Parents work in agriculture, often leads to a connection with nature and hard work"
        },
        {
            vn: "Parents who are activists",
            vp: 0.02,
            ve: "Parents are involved in activism, often leads to strong values and a sense of justice"
        },
        {
            vn: "Parents with addiction issues",
            vp: 0.02,
            ve: "Raised by parents with addiction issues, often leads to early maturity and resilience"
        },
        {
            vn: "Parents with mental health issues",
            vp: 0.02,
            ve: "Raised by parents with mental health issues, can lead to early responsibilities and empathy"
        },
        {
            vn: "Non-traditional family structure",
            vp: 0.02,
            ve: "Unique family dynamics, can result in unconventional perspectives"
        },
        {
            vn: "Parents in academia",
            vp: 0.03,
            ve: "Parents work in academia, often leads to a value on education and intellectual pursuits"
        },
        {
            vn: "Parents in blue-collar jobs",
            vp: 0.05,
            ve: "Parents work in blue-collar jobs, often leads to a strong work ethic and practical skills"
        },
        {
            vn: "Parents with criminal background",
            vp: 0.01,
            ve: "Parents have a history of crime, often leads to early exposure to legal issues and resilience"
        },
        {
            vn: "Parents in the military",
            vp: 0.02,
            ve: "Both parents served in the military, often leads to strong discipline and respect for authority"
        },
        {
            vn: "Raised by nannies or caregivers",
            vp: 0.02,
            ve: "Raised primarily by hired help, can lead to different parental dynamics"
        },
        {
            vn: "Parents who are scientists",
            vp: 0.02,
            ve: "Both parents are scientists, often leads to a scientific mindset and curiosity"
        },
        {
            vn: "Raised in a boarding school",
            vp: 0.01,
            ve: "Spent significant time in boarding school, can lead to independence and strong peer bonds"
        },
        {
            vn: "Parents involved in organized crime",
            vp: 0.01,
            ve: "Parents involved in crime networks, often leads to early exposure to danger and secrecy"
        },
        {
            vn: "Parents with multiple marriages",
            vp: 0.02,
            ve: "Parents have had several marriages, often leads to complex family structures"
        },
        {
            vn: "Parents who are diplomats",
            vp: 0.01,
            ve: "Parents work in diplomacy, often leads to exposure to international relations and cultures"
        },
        {
            vn: "Parents who are lawyers",
            vp: 0.02,
            ve: "Both parents are lawyers, often leads to strong argumentation skills and respect for law"
        },
        {
            vn: "Raised in a single-parent household with multiple siblings",
            vp: 0.03,
            ve: "Single parent with many siblings, can lead to strong sibling bonds and responsibility"
        },
        {
            vn: "Parents with artistic careers",
            vp: 0.02,
            ve: "Parents have careers in the arts, often leads to creativity and exposure to the art world"
        },
        {
            vn: "Parents in medical field",
            vp: 0.02,
            ve: "Both parents are in medical professions, often leads to an interest in health and science"
        },
        {
            vn: "Parents involved in farming or agriculture",
            vp: 0.02,
            ve: "Parents work in agriculture, often leads to a connection with nature and hard work"
        },
        {
            vn: "Raised by religious leaders",
            vp: 0.01,
            ve: "Parents are religious leaders, often leads to strong faith and community involvement"
        },
        {
            vn: "Parents with high academic achievements",
            vp: 0.02,
            ve: "Parents have advanced degrees, often leads to high expectations and intellectual pursuits"
        },
        {
            vn: "Parents who are activists",
            vp: 0.02,
            ve: "Parents are involved in activism, often leads to strong values and a sense of justice"
        },
        {
            vn: "Parents with political ambitions",
            vp: 0.01,
            ve: "Parents are politically active, can lead to strong opinions and leadership skills"
        },
        {
            vn: "Parents in entertainment industry",
            vp: 0.02,
            ve: "Parents work in entertainment, can lead to exposure to fame and creative environment"
        },
        {
            vn: "Parents with tech careers",
            vp: 0.02,
            ve: "Parents work in technology, often leads to an interest in innovation and tech skills"
        },
        {
            vn: "Parents involved in sports coaching",
            vp: 0.01,
            ve: "Parents are sports coaches, often leads to athletic skills and competitive nature"
        },
        {
            vn: "Parents with humanitarian careers",
            vp: 0.01,
            ve: "Parents work in humanitarian fields, often leads to a strong sense of empathy and global awareness"
        },
        {
            vn: "Parents who are entrepreneurs",
            vp: 0.03,
            ve: "Parents are entrepreneurs, often leads to a strong work ethic and business skills"
        },
        {
            vn: "Parents with high-profile public careers",
            vp: 0.01,
            ve: "Parents have public-facing careers, can lead to public scrutiny and high expectations"
        },
        {
            vn: "Parents who are chefs or in culinary arts",
            vp: 0.01,
            ve: "Parents work in culinary arts, often leads to a love of food and cooking skills"
        }]};

        /*console.log(CreateCharacterFields[field_id]);
        return (CreateCharacterFields[field_id]).av.map((v,i,a) => {
            console.log(v.vn);
            return addOption(v.vn);
        });*/

    return familyBackgroundField.av.map((v)=>{
        return addOption(v.vn);
    });
   // for(var i in familyBackgroundField.av){

 //   }
}
const createOption = (id, label) => {
    //axios.post()
};

const addOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  addOption('One'),
  addOption('Two'),
  addOption('Three'),
];

const CreatableSelectComponent = (field_id = -1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(getOptions(field_id));
  const [value, setValue] = useState(null);


  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = addOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => setValue(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
};

export default CreatableSelectComponent;
