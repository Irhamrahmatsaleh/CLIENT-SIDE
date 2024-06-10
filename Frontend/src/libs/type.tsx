
export type registerForm = {
    full_name : string,
    email : string,
    password : string
}

export type loginForm = {
    email : string,
    password : string
}

export type threadsForm = {
    content : string,
    image : File | null
}

export type repliesForm = {
  content : string,
  image : File | null
}

export type users = {
    isFollowed?: boolean,
    id: number,
    username: string,
    full_name: string
    email: string,
    password: string,
    photo_profile: string,
    bio: string,
    created_at: Date,
    created_by: string,
    updated_at: Date,
    updated_by: string
}

export type likes = {
    id         : number
    user_id    : number
    thread_id  : number
    created_at : Date
    created_by : string
    update_at  : Date 
    updated_by : string
  }

export type thread = {
    id: number,
    image: string,
    content: string,
    number_of_replies: number,
    updated_by: number,
    created_at: Date,
    update_at: Date,
    created_by: number
    users: users
    likes: likes[]
}

export type userReplies = {
  full_name: string,
  username: string,
  photo_profile: string,
}

export type replies = {
  id: number,
  user_id: number,
  thread_id: number,
  image?: string,
  content: string,
  created_at: Date,
  created_by: number,
  updated_at: Date,
  updated_by: number,
  users: userReplies
}


export type threadProfile = {
  id: number,
  image: string,
  content: string,
  number_of_replies: number,
  updated_by: number,
  created_at: Date,
  update_at: Date,
  created_by: number
  likes: likes[]
}

export type following = {
  id         : number,
  followed_id    : number,
  follower_id  : number,
  created_at : Date,
  update_at  : Date,
  followed      : users
  follower    : users
}

export type suggested = {
    id         : number,
    followed_id    : number,
    follower_id  : number,
    created_at : Date,
    update_at  : Date,
    follower    : follower,
    isFollowed: false
  }

  export type follower = {
    full_name: string,
    username: string,
    photo_profile: string,
  }