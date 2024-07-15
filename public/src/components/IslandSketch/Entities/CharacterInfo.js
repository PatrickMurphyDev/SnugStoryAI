class CharacterInfo {
    constructor(name, age, gender, bio) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.bio = bio;
      this.birthdate = { year: 1994, month: 10, day: 14 };
    }
  
    getAge() {
      return this.age; // TODO: Calculate using this.birthdate
    }
  
    setName(name) {
      this.name = name;
    }
  
    setAge(age) {
      this.age = age;
    }
  
    setGender(gender) {
      this.gender = gender;
    }
  
    setBio(bio) {
      this.bio = bio;
    }
  }
  
  export default CharacterInfo;
  