import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const Users2 = () => {

const {isPending, isError, error, data: users} = useQuery({
    queryKey: ['users'],
    queryFn: async () =>{
        const res = await fetch("http://localhost:5000/users") ;
        return res.json() ;
    }
})

//     const [users, setUsers] = useState([]) ;

//     useEffect( () => {
// fetch("http://localhost:5000/users")
// .then(res => res.json())
// .then(data => setUsers(data))
//     } , [])

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
    
    fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.deletedCount > 0){
        Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              const remaining = users.filter(u => u._id !== id)
              setUsers(remaining)
        }
    })
    
          
            }
          });
    }

    if(isPending){
        return <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if(isError){
        return <p>{error.message}</p>
    }

    return (
        <div>
        {/* <h1>Users: {users?.length}</h1> */}

        <div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
  <tr>
    <th></th>
    <th>Name</th>
    <th>Email</th>
    <th>Created At</th>
    <th>Last Login </th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {/* row 1 */}
{
users?.map((user, index) => 
    <tr key={user._id}>
    <th>{index+1}</th>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.createdAt}</td>
    <td>{user?.lastSignInTime}</td>
    <td>
        <button onClick={() => handleEdit(user._id)} className="btn btn-neutral mr-2">Edit</button>
        <button onClick={() => handleDelete(user._id)} className="btn btn-neutral">X</button>
    </td>
  </tr>
)
}

</tbody>
</table>
</div>
    </div>
    );
};

export default Users2;