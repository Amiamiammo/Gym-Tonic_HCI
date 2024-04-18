import React from 'react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Badge, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../API';
import { useTheme } from '@mui/system';

const CustomList = styled(List)({
  width: '100%',
  backgroundColor: 'background.paper',
  maxHeight: '80vh',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  paddingRight: '20px',
  zIndex: 1,
});

const SearchField = styled(TextField)({
  position: 'relative',
  zIndex: 1,
  marginRight: 10,
  transition: 'margin-right 0.3s ease',
  top: 0,
});

const SearchSection = styled('div')({
  width: '100%',
  maxWidth: 360,
  zIndex: 2,
  display: 'flex',
  justifyContent: 'right',
  padding: '10px',
});

const Wrapper = styled('div')({
  padding: '20px',
  zIndex: 1,
});

export default function NestedList(props) {
  const { isSearchOpen, setIsSearchOpen, message, setMessage } = props;
  const [openStates, setOpenStates] = useState({});
  const [openInternalStates, setOpenInternalStates] = useState({});
  const { muscleGroups, exercises } = props;
  const uniqueBodyParts = [...new Set(muscleGroups.map(muscleGroup => muscleGroup.bodypart))];
  const [isSearchIconVisible, setIsSearchIconVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyTraining, setDailyTraining] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const initialState = {};
    const initialInternalState = {};

    uniqueBodyParts.forEach(bodyPart => {
      initialState[bodyPart.replace(/\s/g, '')] = false;
    });
    setOpenStates(initialState);

    muscleGroups.forEach((mC) => {
      initialInternalState[mC.bodypart + mC.musclegroup.replace(/\s/g, '')] = false;
    });
    setOpenInternalStates(initialInternalState);
  }, []);

  useEffect(() => {
    const fetchDailyTraining = async () => {
      try {
        const dailyTrainingToLoad = await API.getDailyTraining();
        setDailyTraining(dailyTrainingToLoad);
      } catch (err) {
        handleErrors(err);
      }
    }
    fetchDailyTraining();


  }, []);

  const handleClick = (menu) => {
    setOpenStates(prevStates => ({
      ...prevStates,
      [menu]: !prevStates[menu],
    }));
  };

  const handleInternalClick = (menu) => {
    setOpenInternalStates((prevInternalStates) => ({
      ...prevInternalStates,
      [menu]: !prevInternalStates[menu],
    }));
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsSearchIconVisible((prev) => !prev);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setIsSearchIconVisible(true);
    setSearchQuery('');
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredExercises = exercises.filter(ex =>
    ex.exname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  }

  const handleDeleteIconClick = async (event, id) => {
    setMessage(' Exercise deleted from your Daily Training ');
    event.stopPropagation(); // Impedisce la propagazione dell'evento di click al ListItemButton padre
    try {
      await API.removeExerciseDailyTraining(id);
      setRefresh(r => !r);
      setDailyTraining(prevDailyTraining => prevDailyTraining.filter(training => training.idex !== id));
    } catch (err) {
      handleErrors(err);
    }
  }

  const handleAddIconClick = async (event, id) => {
    setMessage("Exercise added to your Daily Training ");
    event.stopPropagation(); // Impedisce la propagazione dell'evento di click al ListItemButton padre
    try {
      await API.addExerciseDailyTraining(id);
      setRefresh(prev => {
        if (prev)
          return !prev;
        else
          return prev;
      });
      setDailyTraining(prevDailyTraining => [...prevDailyTraining, { idex: id }]);
    } catch (err) {
      handleErrors(err);
    }
  }

  return (
    <>
      <Wrapper>
        <SearchSection>
          {isSearchIconVisible && (
            <IconButton onClick={toggleSearch}>
              <SearchIcon fontSize='medium' style={{ color: '#1565c0'}}/>
            </IconButton>
          )}
          {isSearchOpen && (
            <SearchField
              variant="standard"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={closeSearch}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </SearchSection>
        {isSearchOpen && filteredExercises.length > 0 && (
          <CustomList component="nav" aria-labelledby="nested-list-subheader">
            {filteredExercises.map((ex) => {
              const muscleGroup = muscleGroups.find((group) => group.idmusclegroup === ex.idmusclegroup);
              return (
                <ListItemButton key={ex.idex} onClick={() => navigate(`/exercises/${ex.idex}`)}>
                  <ListItemText primary={ex.exname} />
                  {muscleGroup && (
                    <Badge color="primary" badgeContent={muscleGroup.musclegroup} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} />
                  )}
                </ListItemButton>
              );
            })}
          </CustomList>
        )}
        {isSearchOpen && filteredExercises.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No exercise found
          </Typography>
        )}
        {!isSearchOpen && (
          <CustomList component="nav" aria-labelledby="nested-list-subheader" >
            {uniqueBodyParts.map((bodyPart) => {
              const nomeStato = bodyPart.replace(/\s/g, '');
              return (
                <Fragment key={nomeStato}>
                  <ListItemText>
                    <Typography variant="body1" fontWeight="bold" sx={{ textAlign: "left" }} fontSize={18}>
                      {bodyPart}
                    </Typography>
                  </ListItemText>
                  <List key={nomeStato} component="div" disablePadding>
                    {muscleGroups
                      .filter(mC => mC.bodypart === bodyPart)
                      .map(mC => {
                        const nomeStatoInterno = mC.bodypart.replace(/\s/g, '') + mC.musclegroup.replace(/\s/g, '');
                        return (
                          <Fragment key={nomeStatoInterno}>
                            <ListItemButton
                              onClick={() => handleInternalClick(nomeStatoInterno)}
                              key={nomeStatoInterno}
                              sx={{ textAlign: 'left' }}
                            >
                              {openInternalStates[nomeStatoInterno] ? <ExpandLess /> : <ExpandMore />}
                              <ListItemText primary={<Typography variant='body1' fontWeight="medium" fontSize={18}>{mC.musclegroup}</Typography>} sx={{ textAlign: 'left' }} />
                            </ListItemButton>
                            <Collapse in={openInternalStates[nomeStatoInterno]} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding key={nomeStatoInterno}>
                                {exercises
                                  .filter(ex => ex.idmusclegroup === mC.idmusclegroup)
                                  .filter(ex => ex.exname.toLowerCase().includes(searchQuery.toLowerCase()))
                                  .map(ex => (
                                    <ListItemButton key={ex.idex} sx={{ boxShadow: 1 }} onClick={() => navigate(`/exercises/${ex.idex}`)}>
                                      <ListItemText primary={<Typography variant='body1' fontSize={17}>{ex.exname}</Typography>} sx={{ textAlign: 'left', pl: '30px' }} />
                                      {dailyTraining.map(training => training.idex).includes(ex.idex) ? (
                                        <IconButton onClick={(e) => handleDeleteIconClick(e, ex.idex)} size="small" sx={{ marginLeft: 'auto' }}>
                                          <DeleteIcon style={{ color: '#a30000' }} />
                                        </IconButton>
                                      ) : (
                                        <IconButton onClick={(e) => handleAddIconClick(e, ex.idex)} size="small" sx={{ marginLeft: 'auto' }}>
                                          <Add style={{ color: '#1b998b' }}
                                          />
                                        </IconButton>
                                      )}
                                    </ListItemButton>
                                  ))}
                              </List>
                            </Collapse>
                          </Fragment>
                        );
                      })}
                  </List>
                </Fragment>
              );
            })}
          </CustomList>
        )}
      </Wrapper>
    </>
  );
}