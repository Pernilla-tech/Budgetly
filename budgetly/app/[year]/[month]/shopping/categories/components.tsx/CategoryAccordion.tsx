import React, { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Expense, GroupExpenseFood } from "@/components/types/collection";
import { Divider } from "@mui/material";

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
        <Typography>
          <p>{categoryTotal.group_category?.replace("food/", "")}</p>
          totalt: {categoryTotalSum} kr
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Divider />
        {expenses &&
          expenses
            .filter(
              (expense) => expense.category === categoryTotal.group_category
            )
            .map((expense) => (
              <Typography key={expense.id}>
                {expense.item}: {expense.price} kr
              </Typography>
            ))}
        <Divider />
        <Typography>Totalt: {categoryTotalSum} kr</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryAccordion;
