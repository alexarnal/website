import tkinter as tk
from tkinter import filedialog, messagebox
import threading
import time

class Teleprompter:
    def __init__(self, root):
        self.root = root
        self.root.title("Teleprompter")
        self.root.geometry("800x600")
        
        # Settings
        self.font_size = 32
        self.scroll_speed = 2  # pixels per update
        self.is_scrolling = False
        self.scroll_delay = 0.03  # seconds between updates
        
        # Create menu bar
        menubar = tk.Menu(root)
        root.config(menu=menubar)
        
        file_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="Load Script", command=self.load_script)
        file_menu.add_command(label="Clear", command=self.clear_text)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=root.quit)
        
        # Create control panel
        control_frame = tk.Frame(root, bg='#2b2b2b', pady=5)
        control_frame.pack(fill=tk.X)
        
        # Speed controls
        tk.Label(control_frame, text="Speed:", bg='#2b2b2b', fg='white').pack(side=tk.LEFT, padx=5)
        tk.Button(control_frame, text="-", command=self.decrease_speed, width=3).pack(side=tk.LEFT, padx=2)
        self.speed_label = tk.Label(control_frame, text=str(self.scroll_speed), bg='#2b2b2b', fg='white', width=3)
        self.speed_label.pack(side=tk.LEFT)
        tk.Button(control_frame, text="+", command=self.increase_speed, width=3).pack(side=tk.LEFT, padx=2)
        
        # Font size controls
        tk.Label(control_frame, text="Font:", bg='#2b2b2b', fg='white').pack(side=tk.LEFT, padx=(20, 5))
        tk.Button(control_frame, text="-", command=self.decrease_font, width=3).pack(side=tk.LEFT, padx=2)
        self.font_label = tk.Label(control_frame, text=str(self.font_size), bg='#2b2b2b', fg='white', width=3)
        self.font_label.pack(side=tk.LEFT)
        tk.Button(control_frame, text="+", command=self.increase_font, width=3).pack(side=tk.LEFT, padx=2)
        
        # Playback controls
        self.play_button = tk.Button(control_frame, text="▶ Play", command=self.toggle_scroll, width=8, bg='#4CAF50', fg='white')
        self.play_button.pack(side=tk.LEFT, padx=20)
        
        tk.Button(control_frame, text="⏮ Reset", command=self.reset_position, width=8).pack(side=tk.LEFT, padx=2)
        
        # Create text widget with scrollbar
        text_frame = tk.Frame(root)
        text_frame.pack(fill=tk.BOTH, expand=True)
        
        self.text_widget = tk.Text(
            text_frame,
            font=('Arial', self.font_size),
            bg='black',
            fg='white',
            wrap=tk.WORD,
            padx=20,
            pady=20,
            spacing3=10
        )
        self.text_widget.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        scrollbar = tk.Scrollbar(text_frame, command=self.text_widget.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.text_widget.config(yscrollcommand=scrollbar.set)
        
        # Instructions
        instructions = """Welcome to Teleprompter!

Keyboard Shortcuts:
• SPACE - Play/Pause
• UP/DOWN - Adjust speed
• +/- - Adjust font size
• R - Reset to top
• F11 - Fullscreen

Click 'File > Load Script' to load your text file, or paste your script here."""
        
        self.text_widget.insert('1.0', instructions)
        
        # Bind keyboard shortcuts
        root.bind('<space>', lambda e: self.toggle_scroll())
        root.bind('<Up>', lambda e: self.increase_speed())
        root.bind('<Down>', lambda e: self.decrease_speed())
        root.bind('<plus>', lambda e: self.increase_font())
        root.bind('<equal>', lambda e: self.increase_font())  # For keyboards without numpad
        root.bind('<minus>', lambda e: self.decrease_font())
        root.bind('<r>', lambda e: self.reset_position())
        root.bind('<R>', lambda e: self.reset_position())
        root.bind('<F11>', lambda e: self.toggle_fullscreen())
        
        self.is_fullscreen = False
        
    def toggle_fullscreen(self):
        self.is_fullscreen = not self.is_fullscreen
        self.root.attributes('-fullscreen', self.is_fullscreen)
        
    def load_script(self):
        filename = filedialog.askopenfilename(
            title="Select Script File",
            filetypes=[("Text Files", "*.txt"), ("All Files", "*.*")]
        )
        if filename:
            try:
                with open(filename, 'r', encoding='utf-8') as file:
                    content = file.read()
                    self.text_widget.delete('1.0', tk.END)
                    self.text_widget.insert('1.0', content)
                    self.reset_position()
            except Exception as e:
                messagebox.showerror("Error", f"Could not load file:\n{str(e)}")
    
    def clear_text(self):
        self.text_widget.delete('1.0', tk.END)
        self.is_scrolling = False
        self.update_play_button()
    
    def increase_speed(self):
        self.scroll_speed = min(20, self.scroll_speed + 1)
        self.speed_label.config(text=str(self.scroll_speed))
    
    def decrease_speed(self):
        self.scroll_speed = max(1, self.scroll_speed - 1)
        self.speed_label.config(text=str(self.scroll_speed))
    
    def increase_font(self):
        self.font_size = min(72, self.font_size + 2)
        self.text_widget.config(font=('Arial', self.font_size))
        self.font_label.config(text=str(self.font_size))
    
    def decrease_font(self):
        self.font_size = max(12, self.font_size - 2)
        self.text_widget.config(font=('Arial', self.font_size))
        self.font_label.config(text=str(self.font_size))
    
    def toggle_scroll(self):
        self.is_scrolling = not self.is_scrolling
        self.update_play_button()
        if self.is_scrolling:
            threading.Thread(target=self.auto_scroll, daemon=True).start()
    
    def update_play_button(self):
        if self.is_scrolling:
            self.play_button.config(text="⏸ Pause", bg='#ff9800')
        else:
            self.play_button.config(text="▶ Play", bg='#4CAF50')
    
    def auto_scroll(self):
        while self.is_scrolling:
            current_pos = self.text_widget.yview()[1]
            if current_pos >= 1.0:
                self.is_scrolling = False
                self.root.after(0, self.update_play_button)
                break
            
            self.text_widget.yview_scroll(self.scroll_speed, 'units')
            time.sleep(self.scroll_delay)
    
    def reset_position(self):
        self.text_widget.yview_moveto(0)
        self.is_scrolling = False
        self.update_play_button()

if __name__ == "__main__":
    root = tk.Tk()
    app = Teleprompter(root)
    root.mainloop()
