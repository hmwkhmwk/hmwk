const students = [
  { name: "Ronald Weasley", email7: "hmwkapp@gmail.com" },
  { name: "Hermione Granger", email7: "hmwkapp@gmail.com" },
  { name: "Luna Lovegood", email7: "hmwkapp@gmail.com" },
];

const assignments = [
  {
    name: "Magic Potions I",
    description_for_homework:
      "Write up a potion to help students focus on learning",
    files: "http://dummyimage.com/165x245.png/cc0000/ffffff",
    status: "Ready to Send",
    date4: "11/09/2020",
  },
  {
    name: "Enchanments I",
    description_for_homework:
      "Find out which are the most popular enchanments in 2020",
    files: "http://dummyimage.com/181x198.jpg/dddddd/000000",
    status: "Not Ready",
    date4: "11/16/2020",
  },
];

const assignmentsTracker = [
  {
    name: "Ronald Weasley",
    date4: "11/16/2020",
    status: "Checked",
    text9: "6prFK99",
    files: "http://dummyimage.com/146x189.jpg/dddddd/000000",
    text: "C+",
  },
  {
    name: "Hermione Granger",
    date4: "11/16/2020",
    status: "TRsre12",
    text9: "c305625d5f9a11f5bc317012220f440d9925ce7d8d732add790a5bdcba23f6be",
    files: "http://dummyimage.com/181x247.jpg/ff4444/ffffff",
    text: "A+",
  },
  {
    name: "Luna Lovegood",
    date4: "11/23/2020",
    status: "Need to Check",
    text9: "fbEb2f4",
    files: "http://dummyimage.com/118x203.png/dddddd/000000",
    text: "B-",
  },
  {
    name: "Ronald Weasley",
    date4: "11/23/2020",
    status: "Not Submitted",
    text9: "64b60PC",
    files: "",
    text: "",
  },
  {
    name: "Hermione Granger",
    date4: "11/23/2020",
    status: "Need to Check",
    text9: "f805f1A",
    files: "http://dummyimage.com/129x220.bmp/cc0000/ffffff",
    text: "",
  },
  {
    name: "Luna Lovegood",
    date4: "11/16/2020",
    status: "Not Submitted",
    text9: "5b10EEA",
    files: "",
    text: "",
  },
];

module.exports = {
  students,
  assignments,
  assignmentsTracker,
};
