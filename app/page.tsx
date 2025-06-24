"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  title: string
  content: string
  authorId: number
  author?: {
    name: string
    email: string
  }
}

export default function ApiDocumentation() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  // User form states
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [editingUserId, setEditingUserId] = useState<number | null>(null)

  // Post form states
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [postAuthorId, setPostAuthorId] = useState("")
  const [editingPostId, setEditingPostId] = useState<number | null>(null)

  // API Functions
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/user/list")
      const data = await response.json()
      if (data.status === 200) {
        setUsers(data.users)
        toast({ title: "Success", description: data.message })
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch users", variant: "destructive" })
    }
    setLoading(false)
  }

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/post/list")
      const data = await response.json()
      if (data.status === 200) {
        setPosts(data.posts)
        toast({ title: "Success", description: data.message })
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch posts", variant: "destructive" })
    }
    setLoading(false)
  }

  const createUser = async () => {
    if (!userName || !userEmail) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, email: userEmail }),
      })
      const data = await response.json()

      if (data.status === 201) {
        toast({ title: "Success", description: data.message })
        setUserName("")
        setUserEmail("")
        fetchUsers()
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create user", variant: "destructive" })
    }
    setLoading(false)
  }

  const updateUser = async (id: number) => {
    if (!userName || !userEmail) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/user/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, email: userEmail }),
      })
      const data = await response.json()

      if (data.status === 200) {
        toast({ title: "Success", description: data.message })
        setUserName("")
        setUserEmail("")
        setEditingUserId(null)
        fetchUsers()
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update user", variant: "destructive" })
    }
    setLoading(false)
  }

  const deleteUser = async (id: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (data.status === 200) {
        toast({ title: "Success", description: data.message })
        fetchUsers()
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete user", variant: "destructive" })
    }
    setLoading(false)
  }

  const createPost = async () => {
    if (!postTitle || !postContent || !postAuthorId) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          authorId: Number.parseInt(postAuthorId),
        }),
      })
      const data = await response.json()

      if (data.status === 201) {
        toast({ title: "Success", description: data.message })
        setPostTitle("")
        setPostContent("")
        setPostAuthorId("")
        fetchPosts()
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create post", variant: "destructive" })
    }
    setLoading(false)
  }

  const updatePost = async (id: number) => {
    if (!postTitle || !postContent) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/post/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: postTitle, content: postContent }),
      })
      const data = await response.json()

      if (data.status === 200) {
        toast({ title: "Success", description: data.message })
        setPostTitle("")
        setPostContent("")
        setEditingPostId(null)
        fetchPosts()
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update post", variant: "destructive" })
    }
    setLoading(false)
  }

  const deletePost = async (id: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/post/delete/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (data.status === 200) {
        toast({ title: "Success", description: data.message })
        fetchPosts()
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete post", variant: "destructive" })
    }
    setLoading(false)
  }

  const editUser = (user: User) => {
    setUserName(user.name)
    setUserEmail(user.email)
    setEditingUserId(user.id)
  }

  const editPost = (post: Post) => {
    setPostTitle(post.title)
    setPostContent(post.content || "")
    setEditingPostId(post.id)
  }

  const cancelEdit = () => {
    setUserName("")
    setUserEmail("")
    setEditingUserId(null)
    setPostTitle("")
    setPostContent("")
    setPostAuthorId("")
    setEditingPostId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-2 tracking-tight">API Documentation</h1>
          <p className="text-xl text-gray-600 mb-2">CRUD completo para Users & Posts</p>
          <code className="text-sm bg-black text-white px-3 py-1 rounded">@Alana-Rocha</code>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="bg-black text-white p-4 rounded block font-mono">http://localhost:3000/api</code>
          </CardContent>
        </Card>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Criar, listar, editar e excluir usuários</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userName">Nome</Label>
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Digite o nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Digite o email"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {editingUserId ? (
                    <>
                      <Button onClick={() => updateUser(editingUserId)} disabled={loading}>
                        Atualizar Usuário
                      </Button>
                      <Button variant="outline" onClick={cancelEdit}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button onClick={createUser} disabled={loading}>
                      Criar Usuário
                    </Button>
                  )}
                  <Button variant="outline" onClick={fetchUsers} disabled={loading}>
                    Listar Usuários
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            {users.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Usuários ({users.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => editUser(user)}>
                            Editar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* API Endpoints Documentation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Endpoints - Users</h3>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="font-mono">/api/user</code>
                  <span className="text-sm text-gray-600 ml-auto">Verifica se a rota está funcionando</span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">Resposta:</p>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{ "message": "User route is working!" }`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge>POST</Badge>
                  <code className="font-mono">/api/user/create</code>
                  <span className="text-sm text-gray-600 ml-auto">Cria um novo usuário</span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">Body (JSON):</p>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{ "name": "Alana Rocha", "email": "alana@email.com" }`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="font-mono">/api/user/list</code>
                  <span className="text-sm text-gray-600 ml-auto">Lista todos os usuários</span>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge variant="outline">PUT</Badge>
                  <code className="font-mono">/api/user/update/:id</code>
                  <span className="text-sm text-gray-600 ml-auto">Atualiza um usuário específico</span>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge variant="destructive">DELETE</Badge>
                  <code className="font-mono">/api/user/delete/:id</code>
                  <span className="text-sm text-gray-600 ml-auto">Remove um usuário específico</span>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            {/* Post Management */}
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Posts</CardTitle>
                <CardDescription>Criar, listar, editar e excluir posts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postTitle">Título</Label>
                    <Input
                      id="postTitle"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="Digite o título"
                    />
                  </div>
                  {!editingPostId && (
                    <div>
                      <Label htmlFor="postAuthorId">ID do Autor</Label>
                      <Input
                        id="postAuthorId"
                        type="number"
                        value={postAuthorId}
                        onChange={(e) => setPostAuthorId(e.target.value)}
                        placeholder="ID do usuário autor"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="postContent">Conteúdo</Label>
                  <Textarea
                    id="postContent"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Digite o conteúdo do post"
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  {editingPostId ? (
                    <>
                      <Button onClick={() => updatePost(editingPostId)} disabled={loading}>
                        Atualizar Post
                      </Button>
                      <Button variant="outline" onClick={cancelEdit}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button onClick={createPost} disabled={loading}>
                      Criar Post
                    </Button>
                  )}
                  <Button variant="outline" onClick={fetchPosts} disabled={loading}>
                    Listar Posts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            {posts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Posts ({posts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{post.title}</h4>
                            <p className="text-gray-600 mt-1">{post.content}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>ID: {post.id}</span>
                              <span>Autor ID: {post.authorId}</span>
                              {post.author && (
                                <span>
                                  Autor: {post.author.name} ({post.author.email})
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => editPost(post)}>
                              Editar
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deletePost(post.id)}>
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* API Endpoints Documentation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Endpoints - Posts</h3>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge>POST</Badge>
                  <code className="font-mono">/api/post/create</code>
                  <span className="text-sm text-gray-600 ml-auto">Cria um novo post</span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">Body (JSON):</p>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{ "title": "Meu Primeiro Post", "content": "Este é o conteúdo do meu primeiro post", "authorId": 1 }`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="font-mono">/api/post/list</code>
                  <span className="text-sm text-gray-600 ml-auto">Lista todos os posts</span>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge variant="outline">PUT</Badge>
                  <code className="font-mono">/api/post/update/:id</code>
                  <span className="text-sm text-gray-600 ml-auto">Atualiza um post específico</span>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Badge variant="destructive">DELETE</Badge>
                  <code className="font-mono">/api/post/delete/:id</code>
                  <span className="text-sm text-gray-600 ml-auto">Remove um post específico</span>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-gray-600 mb-4">API CRUD - Users & Posts</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Prisma</Badge>
            <Badge variant="outline">SQLite</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
