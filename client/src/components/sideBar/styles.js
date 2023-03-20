import { ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MyListItem = styled(ListItem)({
  backgroundColor: "#fff",
  borderRadius: 8,
  marginBottom: 16,
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
  },
  "&:active": {
    transform: "translateY(-2px)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  },
  "&:focus": {
    outline: "none",
    backgroundColor: "#FAFAFA",
    boxShadow: `0 0 0 3px #e8f5e9`,
  },
});
export const MyListItemText = styled(ListItemText)({
  color: "#222",
  fontWeight: "bold",
  textAlign: "center",
});
