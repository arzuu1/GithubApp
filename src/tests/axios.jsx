import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const mock = new MockAdapter(axios);


const mockOrgs = [
  { id: 1, login: 'Organization1' },
  { id: 2, login: 'Organization2' },
];

const mockRepos = [
  { id: 1, name: 'Repo1' },
  { id: 2, name: 'Repo2' },
];

const mockSearchResults = {
    items: [
      { login: 'user1', id: 1 },
      { login: 'user2', id: 2 },
    ],
  };

  const mockUserSearchResults = {
    items: [
      { id: 1, login: 'user1', avatar_url: 'http://example.com/user1.png' },
      { id: 2, login: 'user2', avatar_url: 'http://example.com/user2.png' },
    ],
    total_count: 20,
  };

mock.onGet('https://api.github.com/users/testuser/orgs').reply(200, mockOrgs);

mock.onGet('https://api.github.com/users/testuser/repos', {
  params: {
    per_page: 10,
    page: 1,
    sort: 'stars',
  },
}).reply(200, mockRepos, { 'x-total-count': 20 });

mock.onGet('http://localhost:3001/search/users?q=testuser&page=1').reply(200, mockSearchResults);
mock.onGet('https://api.github.com/search/users', {
    params: {
      q: 'testuser',
      page: 1,
      per_page: 10,
    },
  }).reply(200, mockUserSearchResults);

mock.onGet('https://api.github.com/users/testuser/orgs').reply(500);
mock.onGet('https://api.github.com/users/testuser/repos').reply(500);
mock.onGet('http://localhost:3001/search/users?q=testuser&page=1').reply(500); 
mock.onGet('https://api.github.com/search/users').reply(500); 



export default mock;
