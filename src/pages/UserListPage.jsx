import { Fragment } from "react/jsx-runtime"

export default function UserListPage( {user}) {
    return (
        <>
            <strong>{user?.name}</strong> - {user?.email}
        </> 
    )
}