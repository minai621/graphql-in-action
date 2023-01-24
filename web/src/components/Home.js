import React, { useState, useEffect } from 'react';

import { useStore } from '../store';
import Search from './Search';
import TaskSummary, { TASK_SUMMARY_FRAGMENT } from './TaskSummary';

/** GIA NOTES
 * Define GraphQL operations here...
 */

const mockTasks = [
  {
    id: 1,
    content: 'Mock content #1',
    author: { username: 'mock-author' },
    tags: ['tag1', 'tag2'],
  },
  {
    id: 2,
    content: 'Mock content #2',
    author: { username: 'mock-author' },
    tags: ['tag1', 'tag2'],
  },
  {
    id: 3,
    content: 'Mock content #3',
    author: { username: 'mock-author' },
    tags: ['tag1', 'tag2'],
  },
];

export default function Home() {
  const { request } = useStore();
  const [taskList, setTaskList] = useState(null);

  const TASK_MAIN_LIST = `
  query taskMainList {
    taskMainList {
      id
      ...TaskSummary
    }
  }
  ${TASK_SUMMARY_FRAGMENT}
`;
  useEffect(() => {
    console.log('request');
    request(TASK_MAIN_LIST).then(({ data }) => {
      setTaskList(data.taskMainList);
    });
    /** GIA NOTES
     *
     *  1) Invoke the query to get list of latest Tasks
     *     (You can't use `await` here but `promise.then` is okay)
     *
     *  2) Change the setTaskList call below to use the returned data:
     *
     */

    setTaskList(mockTasks); // TODO: Replace mockTasks with API_RESP_FOR_taskMainList
  }, [request]);

  if (!taskList) {
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
