interface UserPageProps {
    params: Promise<{ id: string }>;
}
export default async function UserPage({ params }: UserPageProps) {
    const { id } = await params;
    return (
        <div>
            <h1>User Page</h1>
            <p>User ID: {id}</p>
        </div>
    );
}