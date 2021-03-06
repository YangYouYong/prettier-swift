class Instance {
    public func foo() {}
    private func foo() {}
    internal func foo() {}
    public dynamic func foo() {}
    public var foo: String { return "123" }
    public private(set) var foo: String { return "123" }
    @objc public var foo: String { return "123" }
    @objc public var foo: String {
        get {
            return "123"
        }
        set(v) {
            print(v)
        }
    }
    @IBOutlet public var foo: String {
        didSet {
            print(oldValue, foo)
        }
    }
}
class Class {
    public class func foo() {}
    private class func foo() {}
    internal class func foo() {}
}
class Static {
    public static func foo() {}
    private static func foo() {}
    internal static func foo() {}
}
