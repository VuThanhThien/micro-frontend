import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { drawerWidth } from "../config";
import { useSettings } from "../contexts/SettingsProvider";

type SettingsDrawerProps = {
  onDrawerToggle: () => void;
  open: boolean;
};

const SettingsDrawer = ({ onDrawerToggle, open }: SettingsDrawerProps) => {
  const { changeMode, mode } = useSettings();
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage((event.target as HTMLInputElement).value);
  };

  const handleModeChange = (_: any, mode: string) => {
    changeMode(mode);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onDrawerToggle}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="temporary"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h5">{t("settings.drawer.title")}</Typography>
        <IconButton color="inherit" onClick={onDrawerToggle} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ pl: 2, pr: 2 }}>
        <Typography
          gutterBottom
          id="settings-language"
          marginTop={3}
          variant="h6"
        >
          {t("settings.drawer.language.label")}
        </Typography>
        <FormControl>
          <RadioGroup
            aria-label="language"
            name="language-radio-group"
            onChange={handleLanguageChange}
            value={i18n.language}
          >
            <FormControlLabel
              value="en"
              control={<Radio />}
              label={t("settings.drawer.language.options.en")}
            />
            <FormControlLabel
              value="fr"
              control={<Radio />}
              label={t("settings.drawer.language.options.fr")}
            />
          </RadioGroup>
        </FormControl>
        <Typography gutterBottom id="settings-mode" marginTop={3} variant="h6">
          {t("settings.drawer.mode.label")}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          fullWidth
          onChange={handleModeChange}
        >
          <ToggleButton value="light">
            {t("settings.drawer.mode.options.light")}
          </ToggleButton>
          <ToggleButton value="dark">
            {t("settings.drawer.mode.options.dark")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
