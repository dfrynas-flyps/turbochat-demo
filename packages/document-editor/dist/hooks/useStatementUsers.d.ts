type UserType = {
    id: number;
    name: string;
    avatarUrl: string;
};
export declare const useStatementUsers: () => {
    onUserSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    userSearchInputValue: string;
    onUserRemove: (userId: UserType["id"]) => void;
    onUserAdd: (user: UserType) => void;
    selectedUsers: UserType[];
    userSearchResult: UserType[];
};
export {};
//# sourceMappingURL=useStatementUsers.d.ts.map