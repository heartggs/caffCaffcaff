import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

interface DailyValueProps {
  caffeinePer: number;
}

export default function DailyValue(props: DailyValueProps) {
  const [caffeineIntake, setCaffeineIntake] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const userType = userData?.userType;
          const weight = userData?.weight;
          if (userType === "성인") {
            setCaffeineIntake(
              Number(((props.caffeinePer / 400) * 100).toFixed(2))
            );
          } else if (userType === "임산부") {
            setCaffeineIntake(
              Number(((props.caffeinePer / 300) * 100).toFixed(2))
            );
          } else if (userType === "청소년") {
            const weightNum = parseFloat(weight || "0");
            const intake = weightNum * 3;
            setCaffeineIntake(
              Number(((props.caffeinePer / intake) * 100).toFixed(2))
            );
          }
        }
      }
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    const newCaffeineIntake = (props.caffeinePer / (caffeineIntake || 1)) * 100;
    setCaffeineIntake(newCaffeineIntake);
  }, [props.caffeinePer]);

  return (
    <>
      <span>적정섭취량의 </span>
      <span style={{ fontWeight: 600 }}>{caffeineIntake}% </span>
      <span>입니다.</span>
    </>
  );
}
