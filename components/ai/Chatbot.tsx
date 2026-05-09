"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Fab, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  CircularProgress, 
  Avatar 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Chat API error');

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
      {!isOpen && (
        <Fab 
          color="primary" 
          onClick={() => setIsOpen(true)}
          sx={{ 
            backgroundColor: theme.palette.primary.main, 
            '&:hover': { backgroundColor: theme.palette.primary.dark } 
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      {isOpen && (
        <Paper 
          elevation={6} 
          sx={{ 
            width: { xs: 'calc(100vw - 32px)', sm: 400 }, 
            height: { xs: 'calc(100vh - 100px)', sm: 500 }, 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 4, 
            overflow: 'hidden',
            animation: 'slideUp 0.3s ease-out',
            '@keyframes slideUp': {
              '0%': { transform: 'translateY(20px)', opacity: 0 },
              '100%': { transform: 'translateY(0)', opacity: 1 },
            }
          }}
        >
          {/* Header */}
          <Box 
            sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              backgroundColor: theme.palette.primary.main, 
              color: 'white' 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 32, height: 32 }}>
                AI
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                Seva AI Assistant
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box 
            ref={scrollRef}
            sx={{ 
              flex: 1, 
              overflowY: 'auto', 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2, 
              backgroundColor: '#fdfbf7' 
            }}
          >
            {messages.length === 0 && (
              <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
                Namaste! How can I help you today with Sewarth Path Sansthanam?
              </Typography>
            )}
            {messages.map((msg, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' 
                }}
              >
                <Box 
                  sx={{ 
                    maxWidth: '80%', 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: msg.role === 'user' ? theme.palette.primary.main : theme.palette.secondary.main, 
                    color: 'white', 
                    boxShadow: 1 
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                </Box>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: theme.palette.secondary.main, color: 'white' }}>
                  <CircularProgress size={16} color="inherit" />
                </Box>
              </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', gap: 1, bgcolor: 'white' }}>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="Type your message..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              sx={{ bgcolor: theme.palette.primary.main, color: 'white', '&:hover': { bgcolor: theme.palette.primary.dark } }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
