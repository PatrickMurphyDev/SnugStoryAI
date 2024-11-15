class CharacterInfo {
    constructor(name, age, gender, bio, resLot) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.bio = bio;
      this.birthdate = { year: 1994, month: 10, day: 4 };
      this.lotResidence = resLot || {x:0,y:0};
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

    // todo need to add other set get methods
  }
  
  export default CharacterInfo;
  