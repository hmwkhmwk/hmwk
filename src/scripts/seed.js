const studentsGroup = "Students";

const students = [
  { name: "Ronald Weasley", email7: "hmwkapp@gmail.com" },
  { name: "Hermione Granger", email7: "hmwkapp@gmail.com" },
  { name: "Luna Lovegood", email7: "hmwkapp@gmail.com" },
];

const assignmentsGroup = "Wizardry";

const assignments = [
  {
    name: "Magic Potions I",
    description_for_homework:
      "Write up a potion to help students focus on learning",
    files: "http://dummyimage.com/165x245.png/cc0000/ffffff",
    status: "Ready to Send",
    date4: "2020-11-09",
  },
  {
    name: "Enchantments I",
    description_for_homework:
      "Find out which are the most popular enchanments in 2020",
    files: "http://dummyimage.com/181x198.jpg/dddddd/000000",
    status: "Not Ready",
    date4: "2020-11-16",
  },
];

const assignmentsTracker1Group = assignments[0].name;
const assignmentsTracker2Group = assignments[1].name;

const assignmentsTracker1 = [
  {
    name: "Ronald Weasley",
    date4: "2020-11-16",
    status: "Checked",
    text9: "6prFK99",
    files: "http://dummyimage.com/146x189.jpg/dddddd/000000",
    text: "C+",
  },
  {
    name: "Hermione Granger",
    date4: "2020-11-16",
    status: "TRsre12",
    text9: "c305625d5f9a11f5bc317012220f440d9925ce7d8d732add790a5bdcba23f6be",
    files: "http://dummyimage.com/181x247.jpg/ff4444/ffffff",
    text: "A+",
  },
  {
    name: "Luna Lovegood",
    date4: "2020-11-16",
    status: "Not Submitted",
    text9: "5b10EEA",
    files: "",
    text: "",
  },
];

const assignmentsTracker2 = [
  {
    name: "Luna Lovegood",
    date4: "2020-11-23",
    status: "Need to Check",
    text9: "fbEb2f4",
    files: "http://dummyimage.com/118x203.png/dddddd/000000",
    text: "B-",
  },
  {
    name: "Ronald Weasley",
    date4: "2020-11-23",
    status: "Not Submitted",
    text9: "64b60PC",
    files: "",
    text: "",
  },
  {
    name: "Hermione Granger",
    date4: "2020-11-23",
    status: "Need to Check",
    text9: "f805f1A",
    files: "http://dummyimage.com/129x220.bmp/cc0000/ffffff",
    text: "",
  },
];

module.exports = {
  studentsGroup,
  students,
  assignmentsGroup,
  assignments,
  assignmentsTracker1Group,
  assignmentsTracker2Group,
  assignmentsTracker1,
  assignmentsTracker2,
};
