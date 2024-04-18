import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PopupHP from "./PopUpHomepage";
import ExerciseList from "./ExerciseList";
import { Image } from 'mui-image';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Typography, List, ListItem } from "@mui/material";
import { Alert, Snackbar } from '@mui/material';
import API from '../API';
import { Dialog, DialogContent, DialogContentText, ListItemIcon } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slide from '@mui/material/Slide';



const CustomOrbitControls = () => {

  return (
    <OrbitControls
      enableZoom={false}
      enableRotate={true}
      enablePan={false}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
    />
  );
};

const Model = ({ onModelClick }) => {
  const gltf = useLoader(GLTFLoader, "./chad.gltf");

  return (
    <primitive object={gltf.scene} onClick={onModelClick} />
  );
};

export default function ThreeFiber(props) {

  const { muscleGroups, exercises } = props;

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [userLevel, setUserLevel] = useState({});
  const [iconName, setIconName] = useState('');
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  }

  useEffect(() => {
    const initLevel = async () => {
      try {
        const userLevelToLoad = await API.getUserLevel();
        setUserLevel(userLevelToLoad);


      } catch (err) {
        handleErrors(err);

      }

    }

    initLevel();

  }, [])

  useEffect(() => {

    let numBadge = '';

    if (userLevel.level >= 0 && userLevel.level <= 4)
      numBadge = "1";

    if (userLevel.level >= 5 && userLevel.level <= 9)
      numBadge = "2";

    if (userLevel.level >= 10 && userLevel.level <= 14)
      numBadge = "3";

    if (userLevel.level === 15)
      numBadge = "4";

    let nameImg = "./badge" + numBadge + ".svg";
    setIconName(nameImg);
  }, [userLevel])



  const handleModelClick = (e) => {
    e.stopPropagation();
    const clickedObject = e.object.name;

    const muscleGroupSel = muscleGroups.find(musclegroup => musclegroup.musclegroup === clickedObject);

    const filteredExercises = exercises.filter(e => e.idmusclegroup === muscleGroupSel.idmusclegroup);

    setSelectedMuscleGroup(clickedObject);
    setSelectedExercises(filteredExercises);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }



  return (
    <div className="App" style={{ backgroundColor: 'white' }}>
      <List>
        <ListItem>
          <Avatar
            src="./logoGymTonic.svg"
            alt="Logo"
            style={{
              position: 'absolute',
              top: '15px',
              left: '25px',
              width: '50px',
              height: 'auto',
              zIndex: 9999,
            }} />
          <Avatar
            src={iconName}
            alt="Level"
            style={{
              position: 'absolute',
              top: '0px',
              right: '9px',
              width: '90px',
              height: 'auto',
              zIndex: 9999,
              cursor: 'pointer', // Aggiunto per indicare che l'icona è cliccabile
            }}
            onClick={() => setOpenDialog(true)}
          />
        </ListItem>
      </List>


      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{
        width: '90%', // Imposta la larghezza del dialog
        margin: 'auto', // Centra il dialog
        marginTop: '60px', // Imposta la distanza dal top 
      }}>
        <DialogContent align='center'>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Level
          </Typography>
          <DialogContentText sx={{ typography: 'body1', fontWeight: 'medium' }} >
            {"Complete quizzes to increase your level:"}
          </DialogContentText>
          <List>
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <DialogContentText sx={{ typography: 'body1', fontWeight: 'bold', textAlign: 'left' }}>
                    {"Beginner"}
                  </DialogContentText>
                  <Typography variant="body2" color="textSecondary">
                    {"Level 0-4"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <ListItemIcon sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <ArrowForwardIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={5}>
                  <Image src="\badge1.svg" showLoading sx={{ width: '100%', height: '100%' }} />
                  {/* Adjust the width and maxWidth values as needed */}
                </Grid>
              </Grid>
            </ListItem>



            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <DialogContentText sx={{ typography: 'body1', fontWeight: 'bold', textAlign: 'left' }}>
                  {"Determined Athlete"}
                  </DialogContentText>
                  <Typography variant="body2" color="textSecondary">
                  {"Level 5-9"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <ListItemIcon sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <ArrowForwardIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={5}>
                  <Image src="\badge2.svg" showLoading sx={{ width: '100%', height: '100%' }} />
                </Grid>
              </Grid>
            </ListItem>



            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <DialogContentText sx={{ typography: 'body1', fontWeight: 'bold', textAlign: 'left' }}>
                  {"Master Of Endurance"}
                  </DialogContentText>
                  <Typography variant="body2" color="textSecondary">
                  {"Level 10-14"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <ListItemIcon sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <ArrowForwardIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={5}>
                  <Image src="\badge3.svg" showLoading sx={{ width: '100%', height: '100%' }} />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <DialogContentText sx={{ typography: 'body1', fontWeight: 'bold', textAlign: 'left' }}>
                  {"Fitness Champion"}
                  </DialogContentText>
                  <Typography variant="body2" color="textSecondary">
                  {"Level 15"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <ListItemIcon sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <ArrowForwardIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={5}>
                  <Image src="\badge4.svg" showLoading sx={{ width: '100%', height: '100%' }} />
                </Grid>
              </Grid>
            </ListItem>

          </List>
        </DialogContent>
      </Dialog>


      <div style={{ position: 'absolute', bottom: '80px', width: '100%', textAlign: 'center' }}>
        <Typography fontWeight="bold" fontSize={20}>
          Tap on one muscle group to get started
        </Typography>
      </div>
      <PopupHP
        open={popupOpen}
        handleClose={closePopup}
        title={selectedMuscleGroup}
        content={<ExerciseList exercises={selectedExercises} setMessage={setMessage}/>}
      />
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Suspense fallback={null}>
          <Model onModelClick={handleModelClick} />
          <CustomOrbitControls />
        </Suspense>
        <Environment preset="studio" />
      </Canvas>
      {message && (
                <Snackbar TransitionComponent={Slide} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={Boolean(message)} autoHideDuration={1500} onClose={() => setMessage('')}>
                    <Alert onClose={() => setMessage('')} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
      )}
    </div >
  );
}
