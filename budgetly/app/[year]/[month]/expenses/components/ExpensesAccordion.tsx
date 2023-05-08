import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

import styles from "./styles.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomIconButton from "@/components/components/ui/CustomIconButton";
import { Expense } from "@/components/types/collection";

type Props = {
  expense: Expense[];
  expenseCategory: string | null;
  expenseSum: number | null;
  deleteGroupedExpenses: (category: string | null) => void;
};

const ExpensesAccordion = ({
  expenseCategory,
  expenseSum,
  expense,
  deleteGroupedExpenses,
}: Props) => {
  return (
    <Accordion
      sx={{
        backgroundColor: "#2B2C4B",
      }}
      className={styles.expensesAccordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="expenses-content"
        id="expenses-header"
      >
        <div className={styles.expenseCategory}>
          <p>{expenseCategory}</p>
          <p>{expenseSum} kr</p>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Divider className={styles.divider} />
        <div className={styles.card}>
          {expense &&
            expense
              .filter((expenses) =>
                expenses.category.includes(expenseCategory?.toString() ?? "")
              )
              .map((expenses) => (
                <div key={expenses.id}>
                  <div>
                    <p>{expenses.item}</p>
                  </div>
                  <div>
                    <p>{expenses.price} kr</p>
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
            <p>{expenseSum} kr</p>
          </div>
        </div>
        <span className={styles.buttonWrapper}>
          <CustomIconButton
            className={styles.deleteIconButton}
            onClick={() => deleteGroupedExpenses(expenseCategory)}
          >
            <DeleteOutlineIcon />
          </CustomIconButton>
        </span>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpensesAccordion;
