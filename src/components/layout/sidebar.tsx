"use client"

const Sidebar = () => {
  const pages = [
    {name: 'Dashboard', link: '/dashboard'},
    {name: 'All Transactions', link: '/allTransactions'}
  ]
  return (
    <div className="h-[100vh] absolute left-0 w-1/6 flex flex-col bg-white border-r-2 border-lightgrey text-black p-2">
      {pages.map((page) => (
        <a key={`sidebar-link-${page.link}`} className="m-2 mb-0 pb-2 border-b-2 border-lightgrey" href={page.link}>{page.name}</a>
      ))}
    </div>
  )
}

export default Sidebar;