export function initModalClose() {
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
}

export function showVideoModal(videoUrl, title) {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  const videoTitle = document.getElementById('video-modal-title');
  if (!modal || !video || !videoTitle) return;

  video.src = videoUrl || '';
  videoTitle.textContent = title || '';
  modal.classList.add('active');

  const closeBtn = document.querySelector('#video-modal .close-modal');
  if (closeBtn) {
    const onClose = () => {
      video.pause();
      closeBtn.removeEventListener('click', onClose);
    };
    closeBtn.addEventListener('click', onClose);
  }
}
