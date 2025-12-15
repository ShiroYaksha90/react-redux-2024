function Error({ error }) {
  return (
    <p className="error">
      <span>💥</span> {error}
    </p>
  );
}

export default Error;
