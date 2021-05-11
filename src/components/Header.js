import React from 'react'

function Header() {
    const profile = 'https://images.unsplash.com/photo-1529020503594-28b8a4f004bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    return (
        <div className="w-full h-16 bg-gray-900">
            <div className="h-full flex items-center px-8">
                <img src={profile} className="w-12 h-12 rounded-full" alt="profile" />
                <span className="text-white pl-4 ">Autonomo</span>
            </div>
            
        </div>
    )
}

export default Header
