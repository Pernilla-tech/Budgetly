import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Expense, GroupExpenseFood } from "@/components/types/collection";
import { Divider } from "@mui/material";
import styles from "./styles.module.css";

type Props = {
  categoryTotal: GroupExpenseFood;
  categoryTotalSum: number | null;
  expenses: Expense[];
};

const CategoryAccordion = ({
  expenses,
  categoryTotal,
  categoryTotalSum,
}: Props) => {
  return (
    <Accordion
      sx={{
        backgroundColor: "#2B2C4B",
        color: "white",
        width: "100%",
        margin: "20px",
        borderRadius: "12px",
        padding: "10px",

        "& svg": {
          color: "white",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div>
          <p>{categoryTotal.group_category?.replace("food/", "")}</p>
          <p>{categoryTotalSum} kr</p>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Divider className={styles.divider} />
        <div className={styles.card}>
          {expenses &&
            expenses
              .filter(
                (expense) => expense.category === categoryTotal.group_category
              )
              .map((expense) => (
                <div key={expense.id}>
                  <div>
                    <p>{expense.item}</p>
                  </div>
                  <div>
                    <p>{expense.price} kr</p>
                  </div>
                </div>
              ))}
        </div>
        <Divider className={styles.divider} />
        <div className={styles.description}>
          <div>
            <p>Total:</p>
          </div>
          <div>
            <p> {categoryTotalSum} kr</p>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryAccordion;
