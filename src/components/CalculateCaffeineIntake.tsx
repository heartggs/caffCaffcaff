import { useState, useEffect } from "react";
import styles from "../assets/css/CalculateCaffeineIntake.module.css";

interface CalculateCaffeineIntakeProps {
  userType: string;
  weight: string;
}

export default function CalculateCaffeineIntake(
  props: CalculateCaffeineIntakeProps
) {
  const [caffeineIntake, setCaffeineIntake] = useState(0);

  useEffect(() => {
    const calculateCaffeineIntake = async () => {
      // 유저 타입에 따라 카페인 섭취량을 계산합니다.
      if (props.userType === "성인") {
        setCaffeineIntake(400);
      } else if (props.userType === "임산부") {
        setCaffeineIntake(300);
      } else if (props.userType === "청소년") {
        // const intake = props.weight * 2.5;
        const weight = parseFloat(props.weight || "0");
        const intake = weight * 3;
        setCaffeineIntake(intake);
      }
    };
    calculateCaffeineIntake();
  }, [props.userType, props.weight]);
  return (
    <>
      <div className={styles.caffNumber}>{caffeineIntake}mg</div>
    </>
  );
}
