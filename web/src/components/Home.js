import React from 'react';
import Search from './Search';
import TaskSummary, { TASK_SUMMARY_FRAGMENT } from './TaskSummary';
import { gql, useQuery } from '@apollo/client';

const TASK_MAIN_LIST = gql`
  query taskMainList {
    taskMainList {
      id
      ...TaskSummary
    }
  }
  ${TASK_SUMMARY_FRAGMENT}
`;
export default function Home() {
  const { error, loading, data } = useQuery(TASK_MAIN_LIST);
  const { taskList } = data;
  if (error) {
    return <div className='error'>{error.message}</div>;
  }
  if (loading) {
    return <div className='loading'>Loading...</div>;
  }
  return (
    <div>
      <Search />
      <div>
        <h1>Latest</h1>
        {taskList.map((task) => (
          <TaskSummary key={task.id} task={task} link={true} />
        ))}
      </div>
    </div>
  );
}
