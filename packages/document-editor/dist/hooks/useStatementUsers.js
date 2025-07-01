import { useCallback, useMemo, useState } from 'react';
const usersMock = [
    {
        id: 1,
        name: 'Tony Stark',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: 2,
        name: 'Bruce Banner',
        avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: 3,
        name: 'Thor Odinson',
        avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: 4,
        name: 'Natasha Romanoff',
        avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        id: 5,
        name: 'Peter Parker',
        avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
        id: 6,
        name: 'Clint Barton',
        avatarUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    {
        id: 7,
        name: 'Loki Odinson',
        avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
];
// NOTE: As for TA-326 this hook needs a BE to be fully functional,
// therefore we provide fake users mock while BE is not ready.
export const useStatementUsers = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const onUserSearch = useCallback((event) => {
        setSearchInputValue(event.target.value);
    }, []);
    const onUserRemove = useCallback((userId) => {
        setSelectedUsers((prevUsers) => {
            return prevUsers.filter((user) => user.id !== userId);
        });
    }, []);
    const onUserAdd = useCallback((user) => {
        setSearchInputValue('');
        setSelectedUsers((prevUsers) => {
            return [...prevUsers, user];
        });
    }, []);
    const userSearchResult = useMemo(() => {
        return usersMock
            .filter((user) => user.name.toLowerCase().includes(searchInputValue))
            .filter((user) => !selectedUsers.map((u) => u.id).includes(user.id));
    }, [searchInputValue, selectedUsers]);
    return {
        onUserSearch,
        userSearchInputValue: searchInputValue,
        onUserRemove,
        onUserAdd,
        selectedUsers,
        userSearchResult,
    };
};
//# sourceMappingURL=useStatementUsers.js.map