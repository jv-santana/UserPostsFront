-- Insert sample users
INSERT INTO "User" ("name", "email") VALUES 
('Alana Rocha', 'alana@email.com'),
('João Silva', 'joao@email.com'),
('Maria Santos', 'maria@email.com');

-- Insert sample posts
INSERT INTO "Post" ("title", "content", "authorId") VALUES 
('Primeiro Post', 'Este é o conteúdo do primeiro post', 1),
('Segundo Post', 'Mais conteúdo interessante aqui', 2),
('Post sobre Next.js', 'Next.js é incrível para desenvolvimento full-stack', 1);
