interface SubmitBtnProps {
    loading: boolean
    className?: string
    children?: string
    onClick?: () => void
    loadingText?: string
}

export default function SubmitBtn({ loading, className, children, onClick, loadingText }: SubmitBtnProps) {
    return <button type="submit" className={`btn ${className}`} onClick={onClick} disabled={loading}>{!loading ? children ?? "submit" : loadingText ?? "submitting"}</button>
}
