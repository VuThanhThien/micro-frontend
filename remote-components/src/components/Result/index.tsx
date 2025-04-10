import React from "react";
import { Box, Container, Typography } from "@mui/material";
import SvgContainer from "components/SvgContainer";

type ResultImageProps = {
  customImage?: React.ReactNode;
  status?: "error" | "success";
};

const ResultImage: React.FC<ResultImageProps> = ({
  customImage,
  status,
}: ResultImageProps) => {
  let image = customImage;

  if (!image) {
    if (status === "error") {
      image = <img src={"assets/error.svg"} alt="Logo" />;
    } else if (status === "success") {
      image = <img src={"assets/succes.svg"} alt="Logo" />;
    }
  }

  return image ? <Box marginBottom={3}>{image}</Box> : null;
};

type ResultProps = {
  extra?: React.ReactNode;
  image?: React.ReactNode;
  maxWidth?: "xs" | "sm";
  status?: "error" | "success";
  subTitle?: string;
  title: string;
};

const Result: React.FC<ResultProps> = ({
  extra,
  image,
  maxWidth = "xs",
  status,
  subTitle,
  title,
}: ResultProps) => {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ textAlign: "center", px: 3, py: 8 }}>
        <SvgContainer>
          <ResultImage customImage={image} status={status} />
        </SvgContainer>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        {subTitle && <Typography variant="body2">{subTitle}</Typography>}
        {extra && <Box sx={{ mt: 4, textAlign: "center" }}>{extra}</Box>}
      </Box>
    </Container>
  );
};

export default Result;
