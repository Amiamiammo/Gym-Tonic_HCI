import * as React from 'react';
import ThreeFiber from './ThreeFiber';


export default function Homepage(props) {

  const {muscleGroups, exercises, userLevel} = props;


  return (
          <ThreeFiber muscleGroups={muscleGroups} exercises={exercises}/>
  );
}
