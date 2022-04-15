import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

//CONFIG

export const firebaseConfig = {
  apiKey: "AIzaSyCgUUcILXYoh2c2g-sg95XAMUnThQPXTO0",
  authDomain: "gota-33778.firebaseapp.com",
  projectId: "gota-33778",
  storageBucket: "gota-33778.appspot.com",
  messagingSenderId: "564227042984",
  appId: "1:564227042984:web:7754accf4a2911129d9c9d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();

//API functions
let donationsData = null;

//ADD NEW DOCUMENT
export async function addData(
  name,
  desc,
  startDate,
  endDate,
  products,
  collectPoint
) {
  function stringCorrection(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
    text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
    text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
    text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
    text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
    text = text.replace(new RegExp("[Ç]", "gi"), "c");
    text = text.replace(/\s/g, "");
    return text;
  }
  const nameSch = stringCorrection(name);

  try {
    const docRef = await addDoc(collection(db, "donations"), {
      name: name,
      nameSch: nameSch,
      description: desc,
      startDate: startDate,
      endDate: endDate,
      products: products,
      isCurrent: false,
      collectPoint: collectPoint,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

//EDIT DOC
export async function editData(id, obj) {
  await updateDoc(doc(db, "donations", id), obj)
    .then(console.log("Document updated"))
    .catch((err) => {
      console.log("Document not updated ", err);
    });
}

//GET ALL DOCUMENTS
export async function getData() {
  try {
    const querySnapshot = await getDocs(collection(db, "donations"));
    const arr = [];
    querySnapshot.forEach((doc) => {
      const donation = doc.data();
      donation.id = doc.id;
      arr.push(donation);
      donationsData = arr;
    });
    window.sessionStorage.setItem("@DON", JSON.stringify(arr));
    return arr;
  } catch (err) {
    console.error("Error geting documents: ", err);
  }
}

//GET A SPECIFC DOCUMENT BY NAME
export async function getSpData(name) {
  const nameStr = name.toLowerCase().replace(" ", "");

  try {
    const donRef = collection(db, "donations");
    const q = query(donRef, where("nameSch", "==", nameStr));
    const qRes = await getDocs(q);
    qRes.forEach((doc) => {
      const donRes = doc.data();
      console.log(typeof donRes);
      console.log(donRes);
      return donRes;
    });
  } catch (err) {
    console.log("caiu no catch");
    console.log(err);
  }
}

//DELETE A DOCUMENT
export async function deleteData(id) {
  await deleteDoc(doc(db, "donations", id));
}

//GET A DOCUMENT FROM LOCAL
export async function searchDonation(name) {
  await getData();

  const nameStr = name.toLowerCase().replace(" ", "");

  function search(value) {
    const valueName = value.name;
    const valueStr = valueName.toLowerCase().replace(" ", "");

    if (valueStr === nameStr) {
      return value;
    }
  }
  const result = donationsData.filter(search);
  return result;
}

//FIND DONATION FROM LOCAL
export function findDonation(name) {
  const donations = JSON.parse(window.sessionStorage.getItem("@DON"));

  function stringCorrection(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
    text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
    text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
    text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
    text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
    text = text.replace(new RegExp("[Ç]", "gi"), "c");
    text = text.replace(" ", "");
    return text;
  }
  const nameStr = stringCorrection(name);

  function search(value) {
    const valueName = value.name;
    const valueStr = stringCorrection(valueName);

    if (valueStr.includes(nameStr) === true) {
      return value;
    }
  }
  const result = donations.filter(search);
  return result;
}

//SAVE USER IN LOCAL

let localUser = null;

export function saveLocalUser(user) {
  localUser = user;
  console.log("logged in");
}

export function getLocalUser() {
  return localUser;
}

//TESTE
export function logDonationsData() {
  console.log(donationsData);
}
