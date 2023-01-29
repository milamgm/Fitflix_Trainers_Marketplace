import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

interface IUserCardProps {
  displayName: string;
  photoURL: string;
}
const UserCard = ({ displayName, photoURL }: IUserCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={photoURL}
        alt={displayName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Profile</Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
